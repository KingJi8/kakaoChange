// 현재 채팅 인덱스와 텍스트 라인 배열을 추적하기 위한 변수 초기화
let chatIndex = 0;
let textLineArray = [];
const prevdata = [],
      talker = [];
const txtLog = document.getElementById('txtlog');
const detector = document.getElementById('detector');

// DOMContentLoaded 이벤트가 발생하면 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('getFileBtn');

    // 파일 입력이 변경되면 실행되는 이벤트 리스너
    textInput.addEventListener('change', function(e) {
        const fileReader = new FileReader();
        const file = e.target.files[0];
        fileReader.readAsText(file,'UTF-8');
        
        // 파일 읽기가 완료되면 실행되는 이벤트 핸들러
        fileReader.onload = function() {
            const text = fileReader.result;
            textArray = text.split('\r\n').reverse();
            txtLog.classList.add("show")        
        };
    });

    // 교차점 관찰자 인스턴스 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadChatBubbles(10); 
            }
        });
    });

    // 교차점 관찰자가 detector 요소를 관찰하도록 설정
    observer.observe(detector);
});

// 채팅 버블을 로드하는 함수
function loadChatBubbles(count) {
    const prevLastChatBubble = txtLog.firstElementChild.nextElementSibling;
    const prevLastChatBubblePosition = prevLastChatBubble ? prevLastChatBubble.offsetTop : 0;

    for (let i = 0; i < count; i++) {
        if (chatIndex >= textArray.length) {
            break;
        }
        const chatBubbleElement = chatBubble(textArray[chatIndex]);
        detector.after(chatBubbleElement);
        chatIndex++;
    }

    if (prevLastChatBubble) {
        const newPosition = prevLastChatBubble.offsetTop;
        const positionDifference = newPosition - prevLastChatBubblePosition;
        txtLog.scrollTop += positionDifference - 700;
    } else {
        txtLog.scrollTop = txtLog.scrollHeight;
    }
}

// 채팅 버블 요소를 생성하는 함수
function chatBubble(line) {
    const kTalkBox = document.createElement('div');
    kTalkBox.classList.add("kTalkBox");
    const kTalkBoxes = txtLog.querySelectorAll('.kTalkBox');

    if (line.includes("---")) { // 날짜
        kTalkBox.innerHTML = `<div class="kkodatebox">${line.replaceAll("---------------", "").trim()}</div>`;
        prevdata.length = 0;
    } else {
        if(line.includes("]")){  // 대화
          const parts = line.split("]");
          const name = parts[0].replace("[", "").trim();
          const time = parts[1].replace("[", "").trim();
          const message = parts[2].trim();

          // 작성자 추가
          if(talker.includes(name) == false){
            talker.push(name);
          }
          // 왼쪽 오른쪽
          if(name === talker[0]){
            kTalkBox.classList.add("right");
          } else {
            kTalkBox.classList.add("left");
          }

          // 대화 생성
          kTalkBox.classList.add("active");
          kTalkBox.innerHTML = `<div class="kkoname">${name}</div>
                                <div class="kkotxtbox">
                                  <div class="kkotxt">${message}</div>
                                  <div class="kkodate">${time}</div>
                                </div>`;
          
          // 이전 대화에서 지워야 할 것
          if(prevdata.length>0 && kTalkBoxes.length>1 && prevdata[0] == name){
            kTalkBoxes[0].querySelector('.kkoname').remove();
            kTalkBoxes[0].classList.remove('active');
            if(prevdata[1] == time) {
              kTalkBox.querySelector('.kkodate').remove();
            }
          }
          
          prevdata[0] = name;
          prevdata[1] = time;
        }
    }
    return kTalkBox;
}