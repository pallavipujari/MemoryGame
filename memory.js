//Declare variables
let wait=false ;
let lastKnownButtonId=undefined;
let lastKnownButtonNumber=undefined;
const numbers=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let counter=0;
//declare Elements
let buttons=document.querySelectorAll("button");
console.log(buttons);
let mainPage=document.getElementById('mainpage');
let playagainbtn=document.createElement('button');
let h1=document.createElement('h1');

//code
shuffle(numbers);
distributeNumbers();


//functions
function getCard(num)
{
    switch(num){
        case '1':
            return '<img src="card1.jpg">';
            case '2':
                return '<img src="card2.jpg">';
                case '3':
                    return '<img src="card3.jpg">';
                    case '4':
                        return '<img src="card4.jpg">';
                        case '5':
                            return '<img src="card5.png">';
                            case '6':
                                return '<img src="card6.jpg">';
                                case '7':
                                    return '<img src="card7.png">';
                                    case '8':
                                        return '<img src="card8.jpg">';
                    default:
                        return  '<img src="backside.jpg">';

    }
}

function shuffle(array) 
    {
        let counter = array.length;
             
        while (counter > 0) {
       
          let index = Math.floor(Math.random() * counter);
      
          counter--;
             
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
      
        return array;
    }

    
    
    function distributeNumbers()
    {
        for(let i=0;i<buttons.length;i++)
        {
            buttons[i].dataset.number=numbers[i];
           // buttons[i].innerText=numbers[i];
        }


    }

    for(let i=0;i<buttons.length;i++)
    {
        buttons[i].addEventListener('click',function(e){
             
              let turnableVal= e.target.dataset.turnable;  

//firstTime click
                if(!wait && lastKnownButtonId== undefined && lastKnownButtonNumber== undefined  && turnableVal=='true')
                {
                    e.target.dataset.turnable='false';
                    e.target.innerHTML= getCard(e.target.dataset.number);                   
                    //e.target.innerText=e.target.dataset.number;
                    e.target.style.backgroundColor='lightyellow';

                  lastKnownButtonId=e.target.id;
                  lastKnownButtonNumber= e.target.dataset.number;
                  
                }
//second click 
                else if(!wait && lastKnownButtonId!== undefined && lastKnownButtonNumber!== undefined  && turnableVal=='true')
                {
                    e.target.dataset.turnable='false';
                    e.target.innerHTML= getCard(e.target.dataset.number);
                    //e.target.innerText=e.target.dataset.number;
                    
//match
                    if(e.target.dataset.number == lastKnownButtonNumber)
                    {
                            e.target.style.backgroundColor='lightgreen'; 
                            console.log("CurrentLast Known button ID if match"+lastKnownButtonId);
                            let temp1=document.getElementById(lastKnownButtonId);
                            temp1.style.backgroundColor='lightgreen';

                            //reset values
                            lastKnownButtonId=undefined;
                            lastKnownButtonNumber=undefined; 
                            counter+=2;


                            if(counter==16)
                            {
                                console.log("Game is Over");
                                
                                h1.innerText="The Game is Over. You Win!!";
                                h1.style.color="blue";
                                mainPage.append(h1);
                                
                                //This is the code for Play again 
                                /* 

                                playagainbtn.classList.add('playAgain');
                                playagainbtn.innerText='PLAY AGAIN';
                                h1.append(playagainbtn);
                                playagainbtn.addEventListener('click',function(){
                                    
                            //reset();
                            wait=false;
                            lastKnownButtonId=undefined;
                            lastKnownButtonNumber=undefined;
                            counter=0;
                            shuffle(numbers);   
                            distributeNumbers();
                            h1.remove();
                                for(let i=0;i<buttons.length;i++)
                                {
                                    buttons[i].innerHTML=getCard(0);
                                    buttons[i].style.backgroundColor='white';
                                    console.log("Reset");
                                }   

                                });
                                */
                            }
                    }
//not Match
                    else          //reset all values
                    {
                            wait=true;
                            e.target.style.backgroundColor='red';
                            document.getElementById(lastKnownButtonId).style.backgroundColor='red';

//do the function after timeout
                        setTimeout(() => {
                            e.target.dataset.turnable='true';
                            e.target.style.backgroundColor='white';
                            e.target.innerHTML= getCard(0);
                            //e.target.innerText="";

                            let temp=document.getElementById(lastKnownButtonId);
                            temp.style.backgroundColor='white';
                            temp.dataset.turnable='true';
                            temp.innerHTML= getCard(0);
                            //temp.innerText="";

                            lastKnownButtonId=undefined;
                            lastKnownButtonNumber=undefined; 
                            wait=false;
                            
                        }, 1000);
                    }

                }









        });
    }