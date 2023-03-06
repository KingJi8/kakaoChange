const $getFileBtn = document.getElementById("getFileBtn");
const $secpg = document.querySelector("#secPage .container");
const $txtLog = document.getElementById("txtlog");
const talker = [];
const bubbleSplit = [];
const fileChanges = [];
const loadingAmount = 20;

// 날짜 구성
const $wholeDate = document.createElement('div');

function dateBubble(date){
  let kkotxtdate = date.replaceAll("---------------","");
  $wholeDate.classList.add('kkodatebox');
  $wholeDate.innerHTML = kkotxtdate;
}

// 버블 구성
function talkBubble(talker, talkTime, talkContent, talk){
  if(talker !== ''){
    talker.classList.add('kkoname');
    talker.innerHTML = talk[0];
  }
  
  if(talkTime !== ''){
    talkTime.classList.add('kkodate');
    talkTime.innerHTML = talk[1];
  }
  
  talkContent.classList.add('kkotxt');
  talkContent.innerHTML = talk[2];
}

// 버블 맞추기
const prevtalk = [];
function settingBubble(putTalk){
  const $kkoul = document.createElement('ul');
  $kkoul.classList.add('kTalkBox', 'active');
  const $talker = document.createElement('li');
  const $talkTime = document.createElement('li');
  const $talkContent = document.createElement('li');
  $txtLog.prepend($kkoul);
  const $kTalkBoxes = $txtLog.querySelectorAll('.kTalkBox');
  talkBubble($talker, $talkTime, $talkContent, putTalk);

  function delkko(num){
    if(prevtalk[0] === putTalk[0] && $kTalkBoxes.length>1) {
      $kTalkBoxes[1].firstElementChild.remove();
      $kTalkBoxes[1].classList.remove('active');
      if(prevtalk[1] === putTalk[1]){
        $kkoul.querySelectorAll('li')[num].remove();
      }
    }
  };

  if(putTalk[0] === talker[0]){ // false 인 경우에도 진행이 되는 이유???
    $kkoul.classList.add('right');
    $kkoul.append($talker, $talkTime, $talkContent);
    delkko(1);
  } else if(putTalk.length > 1 && talker.includes(putTalk[0])) {
    $kkoul.classList.add('left');
    $kkoul.append($talker, $talkContent, $talkTime);
    delkko(2);
  } else if(putTalk[0].includes("---------------")){
    dateBubble(putTalk[0]);
    $kkoul.append($wholeDate);
  } else {
    $kkoul.remove();
  }
  
  prevtalk[0] = putTalk[0];
  prevtalk[1] = putTalk[1];
}

//페이지 만들기
let count = 0;
let loadingCount = 1;
function makepage(start,end) {
  if(count > end) {
    return;
  }
  settingBubble(bubbleSplit[count]);
  count = count+1;
  makepage(start,end);
}


// 파일 업로드 시, 처음 뜨는 내용
$getFileBtn.addEventListener('change', showTxtFile)

function showTxtFile(){
  $txtLog.innerHTML = '';
  bubbleSplit.length = 0;

  // 배열 타입이므로 0번째 파일 참조
  const file = $getFileBtn.files[0];
  const reader = new FileReader();

  // 텍스트 파일 형식으로 읽어오기
  reader.readAsText(file, 'UTF-8');

  reader.onload = function(){
    $secpg.classList.add('show'); // log container 보이기
    fileChanges[0] = reader.result; // 새로 부른 파일 내용 저장

    // 대화 분리
    fileChanges[1] = fileChanges[0].split("\r\n");
    for(let v of fileChanges[1]){
      bubbleSplit.unshift(v.replaceAll("[","").split("] "));
    }

    // 대화 내 화자 정리
    for(let a of bubbleSplit){
      if(a.length > 1 && !talker.includes(a[0])) {
        talker.push(a[0]);
      }
    }
    count = 0;
    loadingCount = 1;
    makepage(0,loadingAmount);
  }
}

// 스크롤에 따라서 새로 로딩
// $txtLog.addEventListener('scroll', function(){
//   console.log('123');
// })

// 스크롤에 따라 새로 로딩할 때, 새로 로딩할 때마다 추가 함수
let checkCount;

$txtLog.addEventListener('click', function(){
  checkCount = count;
  loadingCount = loadingCount+1;
  makepage(checkCount,loadingAmount*loadingCount);
})
