import experienceJSON from '../gameData/experience.json' assert { type: "json" };
import skillJSON from '../gameData/skill.json' assert { type: "json" };
let dataxp = experienceJSON;
let dataSkill = skillJSON;
import qs from '../gameData/quest.json' assert { type: "json" };
import diaryJSON from '../gameData/diary.json' assert { type: "json" };
import ironJSON from '../gameData/iron_pricing.json' assert { type: "json" };
import miscJSON from '../gameData/misc_pricing.json' assert { type: "json" };
let iron = JSON.stringify(ironJSON);
let misc = JSON.stringify(miscJSON);
let diary = JSON.stringify(diaryJSON);

export { dataxp, dataSkill, qs, diaryJSON, ironJSON, miscJSON, iron, misc, diary }