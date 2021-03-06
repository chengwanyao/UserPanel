var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Cache = function (target, propertyKey, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        //console.log(target,propertyKey)
        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }
        return target[cacheKey];
    };
};
var Quality;
(function (Quality) {
    Quality[Quality["WHITE"] = 1] = "WHITE";
    Quality[Quality["GREEN"] = 1.2] = "GREEN";
    Quality[Quality["BLUE"] = 1.8] = "BLUE";
    Quality[Quality["PURPLE"] = 2.5] = "PURPLE";
    Quality[Quality["ORAGE"] = 4] = "ORAGE";
})(Quality || (Quality = {}));
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["HANDSWORD"] = 1] = "HANDSWORD";
    WeaponType[WeaponType["GREATSWORD"] = 1.8] = "GREATSWORD";
    WeaponType[WeaponType["AXE"] = 2] = "AXE";
    WeaponType[WeaponType["KATANA"] = 1.5] = "KATANA";
    WeaponType[WeaponType["HAMMER"] = 2.5] = "HAMMER";
})(WeaponType || (WeaponType = {}));
var ArmorType;
(function (ArmorType) {
    ArmorType[ArmorType["LIGHTARMOR"] = 1] = "LIGHTARMOR";
    ArmorType[ArmorType["LEATHERARMOR"] = 1.4] = "LEATHERARMOR";
    ArmorType[ArmorType["PLATEARMOR"] = 2] = "PLATEARMOR";
    ArmorType[ArmorType["HEAVYARMOR"] = 2.4] = "HEAVYARMOR";
    ArmorType[ArmorType["NOTHINGTOWEAR"] = 0.2] = "NOTHINGTOWEAR";
})(ArmorType || (ArmorType = {}));
var JewelPromotion;
(function (JewelPromotion) {
    JewelPromotion[JewelPromotion["ATTACKPRMOTE"] = 1] = "ATTACKPRMOTE";
    JewelPromotion[JewelPromotion["DEFENCEPRMOTE"] = 2] = "DEFENCEPRMOTE";
    JewelPromotion[JewelPromotion["AGILEPRMOTE"] = 3] = "AGILEPRMOTE";
})(JewelPromotion || (JewelPromotion = {}));
var HeroType;
(function (HeroType) {
    HeroType[HeroType["SABER"] = 0] = "SABER";
    HeroType[HeroType["LANCER"] = 1] = "LANCER";
    HeroType[HeroType["ARCHER"] = 2] = "ARCHER";
    HeroType[HeroType["CASTER"] = 3] = "CASTER";
    HeroType[HeroType["BASERKER"] = 4] = "BASERKER";
    HeroType[HeroType["ASSASIN"] = 5] = "ASSASIN";
    HeroType[HeroType["RIDER"] = 6] = "RIDER";
})(HeroType || (HeroType = {}));
var User = (function () {
    function User(name, level) {
        this.currentExp = 0;
        this.totalExp = 0;
        this.level = 1;
        this.diamonds = 0;
        this.gold = 0;
        this.__heros = [];
        this.__herosInTeam = [];
        this.userName = "";
        this.userName = name;
        this.level = level;
    }
    var d = __define,c=User,p=c.prototype;
    p.getTotalExp = function () {
        this.totalExp = (this.level + 60) * this.level;
        return this.totalExp;
    };
    p.addHeros = function (hero) {
        this.__heros.push(hero);
    };
    p.addHeroInTeam = function (hero) {
        this.__herosInTeam.push(hero);
    };
    p.getFightPower = function () {
        var result = 0;
        this.__herosInTeam.forEach(function (hero) { return result += hero.getFightPower(); });
        return result;
    };
    p.changeHeroTeam = function (heroToUp, heroToDown) {
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return User;
}());
egret.registerClass(User,'User');
var Hero = (function () {
    function Hero(heroID, name, quality, level, heroBitmapID, heroType) {
        this.isInTeam = false;
        this.name = "";
        this.quality = 0;
        this.maxHP = 0;
        this.currentHP = 0;
        this.attack = 0;
        this.defence = 0;
        this.agile = 0;
        this.level = 1;
        this.currentExp = 0;
        this.totalExp = 0;
        this.properties = [];
        //__equipmentsOnEquip : Equipment[] = [];
        this.__weaponsOnEquip = [];
        this.__armorOnEquip = [];
        this.heroType = -1;
        this.heroID = heroID;
        this.name = name;
        this.quality = quality;
        this.level = level;
        this.heroBitemapID = heroBitmapID;
        this.heroType = heroType;
        this.color = GetColor.getColor(quality);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.getTotalExp = function () {
        this.totalExp = (this.level + 50) * this.level;
        return this.totalExp;
    };
    p.addWeapon = function (weapon) {
        this.__weaponsOnEquip[0] = weapon;
    };
    p.addHelment = function (helment) {
        this.__armorOnEquip[0] = helment;
    };
    p.addCorseler = function (Defence) {
        this.__armorOnEquip[1] = Defence;
    };
    p.addShoes = function (Armour) {
        this.__armorOnEquip[2] = Armour;
    };
    p.getMaxHP = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getFightPower() * 0.2; });
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getFightPower() * 0.8; });
        result += this.level * 10 * this.quality;
        this.properties[0] = new Property("MaxHP", result, false);
        return result;
    };
    p.getAttack = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getAttack() * 0.5; });
        result += this.level * 5 * this.quality;
        this.properties[1] = new Property("Attack", result, false);
        return result;
    };
    p.getDefence = function () {
        var result = 0;
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getDefence() * 0.2; });
        result += this.level * 2 * this.quality;
        this.properties[2] = new Property("Defence", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getAglie() * 0.4; });
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getAglie() * 0.4; });
        result += this.level * 4 * this.quality;
        this.properties[3] = new Property("Agility", result, false);
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.__weaponsOnEquip.forEach(function (weapon) { return result += weapon.getFightPower(); });
        this.__armorOnEquip.forEach(function (armor) { return result += armor.getFightPower(); });
        result += (10 + this.getAttack() * 10 + this.getDefence() * 8 + this.getAglie() * 6) * this.level * this.quality;
        return result;
    };
    __decorate([
        Cache
    ], p, "getTotalExp", null);
    __decorate([
        Cache
    ], p, "getMaxHP", null);
    __decorate([
        Cache
    ], p, "getAttack", null);
    __decorate([
        Cache
    ], p, "getDefence", null);
    __decorate([
        Cache
    ], p, "getAglie", null);
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment() {
        this.quality = 0;
        //level = 1;
        this.currentExp = 0;
        //totalExp = 0;
        //agile = 0;
        this.isWeapon = false;
        this.name = "";
        this.__jewelOnEquip = [];
        this.properties = [];
    }
    var d = __define,c=Equipment,p=c.prototype;
    //  @Cache
    //  getTotalExp(){
    //      this.totalExp = (this.level + 20) * this.level;
    //      return this.totalExp;
    //  }
    p.getFightPower = function () {
        return 0;
    };
    p.addJewl = function (jewel) {
        this.__jewelOnEquip.push(jewel);
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(equipmentID, name, quality, weaponType, weaponIconId) {
        _super.call(this);
        this.isWeapon = true;
        this.weaponType = 0;
        this.equipmentID = equipmentID;
        this.name = name;
        this.quality = quality;
        //this.level = level;
        this.weaponType = weaponType;
        this.equipmentBitmapID = weaponIconId;
        this.color = GetColor.getColor(quality);
        this.weaponID = Weapon.weaponNum.toString();
        Weapon.weaponNum++;
    }
    var d = __define,c=Weapon,p=c.prototype;
    p.getAttack = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 10 * this.weaponType * this.quality;
        this.properties[0] = new Property("Attack", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 5 * this.quality / this.weaponType;
        this.properties[1] = new Property("Agile", result, false);
        return result;
    };
    p.getEquipmentInformations = function () {
        this.getAttack();
        this.getAglie();
    };
    p.getFightPower = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower(); });
        result += this.getAttack() * this.quality * 10 + this.getAglie() * this.quality * 5;
        return result;
    };
    //attack = 0;
    Weapon.weaponNum = 0;
    return Weapon;
}(Equipment));
egret.registerClass(Weapon,'Weapon');
var Armor = (function (_super) {
    __extends(Armor, _super);
    function Armor(equipmentID, name, quality, armorType, armorIconId) {
        _super.call(this);
        this.armorType = 0;
        this.isWeapon = false;
        this.equipmentID = equipmentID;
        this.name = name;
        this.quality = quality;
        this.armorType = armorType;
        this.equipmentBitmapID = armorIconId;
        this.color = GetColor.getColor(quality);
        this.armorID = Armor.armorNum.toString();
        Armor.armorNum++;
    }
    var d = __define,c=Armor,p=c.prototype;
    p.getDefence = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 6 * this.armorType * this.quality;
        this.properties[0] = new Property("Defense", result, false);
        return result;
    };
    p.getAglie = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower() * 0.4; });
        result += 5 * this.quality / this.armorType;
        this.properties[1] = new Property("Agile", result, false);
        return result;
    };
    p.getFightPower = function () {
        var result = 0;
        this.__jewelOnEquip.forEach(function (jewel) { return result += jewel.getFightPower(); });
        result += this.getDefence() * this.quality * 10 + this.getAglie() * this.quality * 5;
        return result;
    };
    p.getEquipmentInformations = function () {
        this.getDefence();
        this.getAglie();
    };
    //defence = 0;
    Armor.armorNum = 0;
    return Armor;
}(Equipment));
egret.registerClass(Armor,'Armor');
var Jewel = (function () {
    //promotionType = 0;
    function Jewel(quality) {
        this.quality = 0;
        this.quality = quality;
        this.color = GetColor.getColor(quality);
    }
    var d = __define,c=Jewel,p=c.prototype;
    p.getFightPower = function () {
        var result = 0;
        result = this.quality * 10;
        return result;
    };
    __decorate([
        Cache
    ], p, "getFightPower", null);
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
var Property = (function () {
    function Property(name, value, isRate) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }
    var d = __define,c=Property,p=c.prototype;
    p.getDescription = function () {
        if (this.isRate) {
            return this.name + ": +" + (this.value / 10).toFixed(2) + "%";
        }
        else {
            return this.name + ": +" + this.value;
        }
    };
    return Property;
}());
egret.registerClass(Property,'Property');
var Properties = (function () {
    function Properties() {
        this.all = [
            "攻击力",
            "防御力",
            "敏捷",
            "品质"
        ];
    }
    var d = __define,c=Properties,p=c.prototype;
    p.getpropertieName = function () {
    };
    return Properties;
}());
egret.registerClass(Properties,'Properties');
var Package = (function () {
    function Package() {
    }
    var d = __define,c=Package,p=c.prototype;
    return Package;
}());
egret.registerClass(Package,'Package');
var GetColor = (function () {
    function GetColor() {
    }
    var d = __define,c=GetColor,p=c.prototype;
    GetColor.getColor = function (quality) {
        var color;
        if (quality == Quality.WHITE)
            color = 0x000020;
        if (quality == Quality.BLUE)
            color = 0x000020;
        if (quality == Quality.GREEN)
            color = 0x000020;
        if (quality == Quality.PURPLE)
            color = 0x000020;
        if (quality == Quality.ORAGE)
            color = 0x000020;
        return color;
    };
    return GetColor;
}());
egret.registerClass(GetColor,'GetColor');
//# sourceMappingURL=Hero.js.map