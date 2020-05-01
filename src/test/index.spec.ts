import parse from "../parse.v2";

// const data9 = `{HurtByTimestamp:0,Attributes:[{Base:8.0d,Name:"generic.maxHealth"},{Base:0.0d,Name:"generic.knockbackResistance"},{Base:0.23000000417232513d,Name:"generic.movementSpeed"},{Base:0.0d,Name:"generic.armor"},{Base:0.0d,Name:"generic.armorToughness"},{Base:16.0d,Modifiers:[{UUIDMost:3916969332854638452L,UUIDLeast:-5296221164471326951L,Amount:-0.036386918411663506d,Operation:1,Name:"Random spawn bonus"}],Name:"generic.followRange"}],Invulnerable:0b,ForcedAge:0,PortalCooldown:0,AbsorptionAmount:0.0f,FallDistance:0.0f,InLove:0,DeathTime:0s,HandDropChances:[0.085f,0.085f],PersistenceRequired:0b,Age:0,Motion:[0.0d,0.0d,0.0d],Leashed:0b,UUIDLeast:-6467161866540585049L,Health:8.0f,Color:0b,LeftHanded:0b,Air:300s,OnGround:0b,Dimension:0,Rotation:[118.56383f,0.0f],HandItems:[{},{}],ArmorDropChances:[0.085f,0.085f,0.085f,0.085f],UUIDMost:-2488286406212760455L,Pos:[391.5d,63.0d,422.5d],Fire:0s,ArmorItems:[{},{},{},{}],CanPickUpLoot:0b,Sheared:0b,HurtTime:0s}`

describe('基础语法测试', () => {
    test('空对象', () => {
      expect(parse(`{}`)).toEqual({});
      expect(parse(`{foo:{baz:{}}}`)).toEqual({ foo: {  baz: {} } });
      expect(parse(`{foo:{},baz:{}}`)).toEqual({ foo: {}, baz: {} });
      expect(parse(`{foo:{},baz:{bar:{}}}`)).toEqual({ foo: {}, baz: { bar: {} } });
    })
    test('基础值类型', () => {
      expect(parse(`{foo:1}`)).toEqual({ foo: '1' });
      expect(parse(`{foo:1.1}`)).toEqual({ foo: '1.1' });
      expect(parse(`{foo:1.1d}`)).toEqual({ foo: '1.1d' });
      expect(parse(`{foo:1.1f}`)).toEqual({ foo: '1.1f' });
      expect(parse(`{foo:1b}`)).toEqual({ foo: '1b' });
      expect(parse(`{foo:"baz"}`)).toEqual({ foo: 'baz' });
    })
    test('转义', () => {
      expect(parse(`{foo:"{\\\"bar\\\":\\\"baz\\\"}"}`)).toEqual({ foo: '{"bar":"baz"}' });
      expect(parse(`{foo:'{"bar":"baz"}'}`)).toEqual({ foo: '{"bar":"baz"}' });
    })
    test('空白符', () => {
      expect(parse(`{ foo: 1 }`)).toEqual({ foo: '1' });
      expect(parse(`{ foo: 1.1 }`)).toEqual({ foo: '1.1' });
      expect(parse(`{foo: "baz" }`)).toEqual({ foo: 'baz' });
      expect(parse(`{foo: "ba z" }`)).toEqual({ foo: 'ba z' });
    })
    test('数组', () => {
      expect(parse(`{ foo: [1, 2, 3] }`)).toEqual({ foo: ["1", "2", "3"] });
      expect(parse(`{ foo: ["1", "2", "3"] }`)).toEqual({ foo: ["1", "2", "3"] });
      expect(parse(`{foo: [ { baz: {} } ] }`)).toEqual({ foo: [ { baz: {} } ] });
      expect(parse(`{foo: [{baz:[ 1, 2, 3 ] } ] }`)).toEqual({ foo: [ { baz: ["1","2","3"] } ] });
    })
    test('特殊数组', () => {
      expect(parse(`{ foo: [0: {}, 1: {}] }`)).toEqual({ foo: [{}, {}] });
      expect(parse(`{ foo: [0: { baz: 1b }, 1: {}] }`)).toEqual({ foo: [{ baz: '1b' }, {}] });
      expect(parse(`{ foo: [I; 123, 123, 132, 13] }`)).toEqual({ foo: ['123', '123', '132', '13'] });
    })
    test('real nbt', () => {
      const a = `{HurtByTimestamp:0,Attributes:[0: {Base:8.0d,Name:"generic.maxHealth"},{Base:0.0d,Name:"generic.knockbackResistance"},{Base:0.23000000417232513d,Name:"generic.movementSpeed"},{Base:0.0d,Name:"generic.armor"},{Base:0.0d,Name:"generic.armorToughness"},{Base:16.0d,Modifiers:[{UUIDMost:3916969332854638452L,UUIDLeast:-5296221164471326951L,Amount:-0.036386918411663506d,Operation:1,Name:"Random spawn bonus"}],Name:"generic.followRange"}],Invulnerable:0b,ForcedAge:0,PortalCooldown:0,AbsorptionAmount:0.0f,FallDistance:0.0f,InLove:0,DeathTime:0s,HandDropChances:[0.085f,0.085f],PersistenceRequired:0b,Age:0,Motion:[0.0d,0.0d,0.0d],Leashed:0b,UUIDLeast:-6467161866540585049L,Health:8.0f,Color:0b,LeftHanded:0b,Air:300s,OnGround:0b,Dimension:0,Rotation:[118.56383f,0.0f],HandItems:[{},{}],ArmorDropChances:[0.085f,0.085f,0.085f,0.085f],UUIDMost:-2488286406212760455L,Pos:[391.5d,63.0d,422.5d],Fire:0s,ArmorItems:[{},{},{},{}],CanPickUpLoot:0b,Sheared:0b,HurtTime:0s}`
      expect(parse(a)).toEqual({
        HurtByTimestamp: '0',
        Attributes: [
          { Base: "8.0d", Name: "generic.maxHealth" },
          { Base: "0.0d", Name: "generic.knockbackResistance" },
          { Base: "0.23000000417232513d", Name: "generic.movementSpeed" },
          { Base: "0.0d", Name: "generic.armor" },
          { Base: "0.0d", Name: "generic.armorToughness" },
          { Base: "16.0d", Name: "generic.followRange", Modifiers: [ { UUIDMost: "3916969332854638452L", UUIDLeast: "-5296221164471326951L", Amount: "-0.036386918411663506d", Operation: "1", Name: "Random spawn bonus", } ] },
        ],
        Invulnerable: '0b',
        ForcedAge: '0',
        PortalCooldown: '0',
        AbsorptionAmount: '0.0f',
        FallDistance: '0.0f',
        InLove: '0',
        DeathTime: '0s',
        HandDropChances: ['0.085f', '0.085f'],
        PersistenceRequired: '0b',
        Age: '0',
        Motion: ['0.0d', '0.0d', '0.0d'],
        Leashed: '0b',
        UUIDLeast: '-6467161866540585049L',
        Health: '8.0f', 
        Color: '0b',
        LeftHanded: '0b',
        Air: '300s', 
        OnGround: '0b',
        Dimension: '0',
        Rotation: ['118.56383f', '0.0f'],
        HandItems: [ {}, {} ],
        ArmorDropChances: ['0.085f', '0.085f', '0.085f', '0.085f'],
        UUIDMost:'-2488286406212760455L',
        Pos: ['391.5d', '63.0d', '422.5d'],
        Fire: '0s',
        ArmorItems:[{}, {}, {}, {}],
        CanPickUpLoot: '0b',
        Sheared: '0b',
        HurtTime: '0s'
      })
    })
})