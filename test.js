
async function quoteskill(skillName, lvlStart, lvlEnd) {
    // let extras = dataSkill.skills[skillName].nmz[1];
    // console.log("nmz = " , extras);
    let resp;
    let stlvlPrice;
    for (let i = lvlStart; i >= 1; i--) {
      if(skillName === 'attack' || skillName === 'defence' || skillName === 'strength'){
        let extras = dataSkill.skills[skillName].nmz[i];
        stlvlPrice = extras;
      }
      else{
          
          stlvlPrice = dataSkill.skills[skillName].default[i];
      }
        if (stlvlPrice == undefined) {
            console.log("undefined")
        }
        else if (dataSkill.skills[skillName].default[1] == false) {
            resp = "Please message <#837416583684685864> for a quote."
            return resp;
        }
        else {
            lvlPrice = dataSkill.skills[skillName].default[i];
            console.log("lvlPrice0:", lvlPrice);
            break;
        }
    }
    xp = dataxp.experience[lvlStart + 1].experience_difference;
    totalxp += xp;
    total = lvlPrice * xp;
    console.log("lvlPrice: ", lvlPrice);
    console.log("xp:", xp);
    for (let j = lvlStart + 2; j <= lvlEnd; j++) {
        check = dataSkill.skills[skillName].default[j];
        if (check == undefined) {
            xp = dataxp.experience[j].experience_difference;
            totalxp += xp;
            semiPrice = lvlPrice * dataxp.experience[j].experience_difference;
            total += semiPrice;
        }
        else {
            xp = dataxp.experience[j].experience_difference;
            totalxp += xp;
            lvlPrice = dataSkill.skills[skillName].default[j];
            semiPrice = lvlPrice * dataxp.experience[j].experience_difference;
            total += semiPrice;
        }
    }
    console.log("TOTAL PRICE =>  ", total);
    console.log("TOTAL XP =>  ", totalxp);
    // return total;
    resp = `Total experience required: ${totalxp}. The total price of skill ${skillName} from level ${lvlStart} to level ${lvlEnd} is ${total}$`
    return resp;
};
