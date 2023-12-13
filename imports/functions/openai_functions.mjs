let openai_functions = [];
openai_functions = [
    {
        name: "quoteskill",
        description: "tell the price of skills for runescape. skills may be starting from rs3, cooking, farming, attacks, agility,rs3agility,rs3invention,rs3slayer,rs3attack,rs3construction,crafting,defence,rs3divination,constructions , firemaking, fishing, rs3fishing, fletching, herblore, rs3herblore, hunter, rs3hunter, rs3magic, magic, mining, rs3mining,runecrafting,smithing,strength,thieving,woodcutting,  etc. Or the question may be like : I want to level up my Agility skill from level 50 to 70.level up construction, attack, agility etc from 1 to 10",
        parameters: {
            type: "object",
            properties: {
                skillName: {
                    type: "string",
                    description: "skill name eg : rs3, cooking, farming, fishing, agility"
                },
                lvlStart: {
                    type: "integer",
                    description: "starting level : 2-43 eg 2 is a starting level"
                },
                lvlEnd: {
                    type: "integer",
                    description: "Ending level : 2-43 eg 43 is an ending level"
                }
            },
            required: ["skillName", "lvlStart", "lvlEnd"]
        }
    },
    {
        name: "quest",
        description: `I want 10 quests of demon slayer tell me its price. while quest may be black knight's fortress ,
        cook's assistant , 
        the corsair curse ,
        demon slayer ,     
        doric's quest ,    
        dragon slayer ,
        ernest the chicken ,
        goblin diplomacy ,
        imp catcher ,
        the knight's sword ,
        misthalin mystery ,
        pirate's treasure ,
        prince ali rescue ,
        
1. The question may also be like : 19 while guthix or price of 19 while guthix.
2. 10 summer ends
3. how much the cost for 20 a shadow over ashdale`,
        "parameters": {
            "type": "object",
            "properties": {
                "questName": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "I want 7 wolf whistle and 10 corsair curse eg: whistle , corsair curse"
                            },
                            "quantity": {
                                "type": "integer",
                                "description": "I want 7 wolf whistle and 10 corsair curse eg: 7 , 10"
                            }
                        }
                    }

                },

            },
            "required": ["questName", "quantity"]


        }
    }
    //                 {
    //                     name: "quest",
    //                     description: `I want 10 quests of demon slayer tell me its price. while quest may be black knight's fortress ,
    //                     cook's assistant , 
    //                     the corsair curse ,
    //                     demon slayer ,     
    //                     doric's quest ,    
    //                     dragon slayer ,
    //                     ernest the chicken ,
    //                     goblin diplomacy ,
    //                     imp catcher ,
    //                     the knight's sword ,
    //                     misthalin mystery ,
    //                     pirate's treasure ,
    //                     prince ali rescue ,

    // 1. The question may also be like : 19 while guthix or price of 19 while guthix.
    // 2. 10 summer ends
    // 3. how much the cost for 20 a shadow over ashdale`,
    //                     parameters: {
    //                         type: "object",
    //                         properties: {
    //                             questName: {
    //                                 type: "string",
    //                                 description: "I want 7 wolf whistle eg: whistle"
    //                             },
    //                             quantity: {
    //                                 type: "integer",
    //                                 description: "I want 13 night at the theater eg: 13"
    //                             }
    //                         },
    //                         required: ["questName", "quantity"]
    //                     }
    //                 }

]

export { openai_functions };