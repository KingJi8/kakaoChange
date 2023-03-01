const $getFileBtn = document.getElementById("getFileBtn");
const $secpg = document.querySelector("#secPage .container");

$getFileBtn.addEventListener('change', showTxtFile)

function showTxtFile(){
  $secpg.innerHTML = '';
  // 배열 타입이므로 0번째 파일 참조
  const file = $getFileBtn.files[0];
  const reader = new FileReader();

  reader.onload = function(){
    // log container 생성
    const addtxtLog = document.createElement("div");
    addtxtLog.id = "txtlog";
    $secpg.appendChild(addtxtLog);
    const $txtLog = document.getElementById("txtlog");

    // 불러온 내용 저장
    const allTxt = reader.result;
    
    // 대화 분리
    const kakaoBubbles = allTxt.split("\r\n");
    const bubbleSplit = [];
    for(let v of kakaoBubbles){
      bubbleSplit.unshift(v.replaceAll("[","").split("] "));
    }

    // 대화 내 화자 정리
    const talker = [];
    for(let a of bubbleSplit){
      if(a.length > 1 && !talker.includes(a[0])) {
        talker.push(a[0]);
      }
    }

    // 날짜 구성
    const $wholeDate = document.createElement('div');

    function dateBubble(date){
      let kkotxtdate = date.replaceAll("---------------","");
      $wholeDate.classList.add('kkodatebox');
      $wholeDate.innerHTML = kkotxtdate;
    }

    // 버블 구성
    const $talker = document.createElement('li');
    const $talkTime = document.createElement('li');
    const $talkContent = document.createElement('li');

    function talkBubble(talk){
      $talker.classList.add('kkoname');
      $talker.innerHTML = talk[0];
      
      $talkTime.classList.add('kkodate');
      $talkTime.innerHTML = talk[1];
      
      $talkContent.classList.add('kkotxt');
      $talkContent.innerHTML = talk[2];
    }

    // 버블 맞추기
    const $uls = document.querySelectorAll('#txtlog .kTalkBox');
    let lastul = $uls[$uls.length-1];

    function settingBubble(putTalk){
      talkBubble(putTalk);
      const $kkoul = document.createElement('ul');

      console.log(putTalk[0] === talker[0]);
      if(putTalk[0] === talker[0]){ // false 인 경우에도 진행이 되는 이유???
        $kkoul.classList.add('right');
        $kkoul.append($talker, $talkContent, $talkTime);
      } else if(putTalk.length > 1 && talker.includes(putTalk[0])) {
        $kkoul.classList.add('left');
        $kkoul.append($talker, $talkContent, $talkTime);
      } else if(putTalk[0].includes("---------------")){
        dateBubble(putTalk[0]);
        $kkoul.append($wholeDate);
      }
      
      $txtLog.prepend($kkoul);
    }
    settingBubble(bubbleSplit[0]);
    console.log($txtLog);
    settingBubble(bubbleSplit[1]);
    console.log($txtLog);
    settingBubble(bubbleSplit[2]);
    console.log($txtLog);


    let count = 0;

    //roll();
    function roll() {
      if(count > 10) {
        return;
      }
      settingBubble(bubbleSplit[count]);
      console.log($kkoul, bubbleSplit[count]);
      count = count+1;
      roll();
    }

  }

  // 텍스트 파일 형식으로 읽어오기
  reader.readAsText(file, 'UTF-8');
}