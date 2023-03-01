const $getFileBtn = document.getElementById("getFileBtn");
const $secpg = document.querySelector("#secPage .container");

$getFileBtn.addEventListener('change', showTxtFile)

function showTxtFile(){
  $secpg.innerHTML = '';
  // 배열 타입이므로 0번째 파일 참조
  const file = $getFileBtn.files[0];
  const reader = new FileReader();

  reader.onload = function(){
    const addtxtLog = document.createElement("div");
    addtxtLog.id = "txtlog";
    $secpg.appendChild(addtxtLog);
    const $txtLog = document.getElementById("txtlog");

    const talker = [];
    let html, datehtml;
    // let kkobubble = [],
    //     kkotxtdate = [],
    //     beforeData = [];
    let count = 0;
    let allTxt = reader.result;

    // 화자 닉네임 구분하기
    let startIndex = allTxt.indexOf("[")+1;
    let endIndex   = allTxt.indexOf("]");
    talker[0] = allTxt.substring(startIndex, endIndex);
    let a = allTxt;
    checkSecTalker();
    function checkSecTalker(){
      a = a.slice(endIndex+12);
      startIndex = a.indexOf("[")+1;
      endIndex = a.indexOf("]");
      let b = a.substring(startIndex, endIndex);

      if(talker[0] == b){
        checkSecTalker();
      } else {
        talker[1] = b;
        return;
      }
    }


    makeTalk();

    function makeTalk(){
      // 대화상자 만들기
      const $kkoul = document.createElement('ul');
      const $kkodate = document.createElement('div');
      $kkoul.classList.add('kTalkBox');
      
      // 대화 분리 (수정본)
      const kakaoBubbles = allTxt.split("\r\n");
      console.log(kakaoBubbles);



      // 대화 분리
      /*let checkfst = allTxt.indexOf("[")+1;
      let checkscd = allTxt.indexOf("[", checkfst+11)+1;
      if(checkscd > 0){
        kkobubble = allTxt.substring(checkfst,checkscd-1);
      } else {
        kkobubble = allTxt;
      }
      kkobubble = kkobubble.replaceAll("[","");
      kkobubble = kkobubble.split("]");
      console.log(kkobubble);
      

      const $uls = document.querySelectorAll('#txtlog .kTalkBox');
      let lastul = $uls[$uls.length-1];

      // 화자 구별 후, li 만들기
      if(kkobubble[0] == fstTalker){
        $kkoul.classList.add('fst');
        if ($uls.length >= 1 && beforeData[0] == kkobubble[0] && beforeData[1] == kkobubble[1]) {
          lastul.lastChild.querySelector('.kkodate').remove();
          html = "<li class='kkotxtbox fst'>";
        } else {
          $kkoul.classList.add('active');
          html = "<li class='kkoname fst'>"+kkobubble[0]+"</li>";
          html += "<li class='kkotxtbox fst'>";
        }
        if(kkobubble[2].includes("---------------")) {
          kkotxtdate = kkobubble[2].split("---------------");
          html += "<span class='kkotxt fst'>"+kkotxtdate[0]+"</span>";
          html += "<span class='kkodate fst'>"+kkobubble[1]+"</span>";
          html += "</li>"
          datehtml = kkotxtdate[1];
        } else {
          html += "<span class='kkotxt fst'>"+kkobubble[2]+"</span>";
          html += "<span class='kkodate fst'>"+kkobubble[1]+"</span>";
          html += "</li>"
        }
      } else if (kkobubble[0] == secTalker) {
        $kkoul.classList.add('scd');
        if ($uls.length >= 1 && beforeData[0] == kkobubble[0] && beforeData[1] == kkobubble[1]) {
          lastul.lastChild.querySelector('.kkodate').remove();
          html = "<li class='kkotxtbox scd'>";
        } else {
          $kkoul.classList.add('active');
          html = "<li class='kkoname scd'>"+kkobubble[0]+"</li>";
          html += "<li class='kkotxtbox scd'>";
        }
        if(kkobubble[2].includes("---------------")) {
          kkotxtdate = kkobubble[2].split("---------------");
          html += "<span class='kkodate scd'>"+ kkobubble[1]+"</span>";
          html += "<span class='kkotxt scd'>"+ kkotxtdate[0]+"</span>";
          html += "</li>"
          datehtml = kkotxtdate[1];
        } else {
          html += "<span class='kkodate scd'>"+kkobubble[1]+"</span>";
          html += "<span class='kkotxt scd'>"+kkobubble[2]+"</span>";
          html += "</li>"
        }
      }*/

      // 텍스트 파일 붙이기
      $kkoul.innerHTML = html;
      $txtLog.appendChild($kkoul);
      if (datehtml != null) {
        $kkodate.classList.add("kkodatebox");
        $kkodate.innerHTML = datehtml;
        $txtLog.appendChild($kkodate);
        datehtml = null;
      }
      allTxt = allTxt.slice(checkscd-1);
      beforeData = [kkobubble[0], kkobubble[1], kkobubble[2]];
      count++;

      if (allTxt.length <= 1 || checkscd <= 0 || count >= 1000){
        return;
      } else {
        makeTalk();
      }
    }
  };
  // 텍스트 파일 형식으로 읽어오기
  reader.readAsText(file, 'UTF-8');
}