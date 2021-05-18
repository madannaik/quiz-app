import userdata from './data';

export const getState = (data) =>{
  if(data<=1){
    return "Try harder next time"
  }
  else if(data>1 && data<7){
    return "Good Job"
  }
  else
    return  "Excellent";
}

export const getMarks = (useranswer={}) =>{
  let marks = 0;
  for (let i=1;i<=7;i++){
    console.log(userdata[1]);
    if(userdata[1].correct.toString() === useranswer[i]){
      marks++;
    }
  }
  return marks;
}