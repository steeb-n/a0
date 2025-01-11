//Vaguely Mondrian Clock

var XCoordinates = [];
var YCoordinates = [];
var xDistances;
var yDistances;
var quadSize;
var quadSizeKeys;
var largestQuad;

// setup() is called once at page-load
function setup() {
    createCanvas(600,600); // make an HTML canvas element width x height pixels
  
    randomSeed(78)
    for(let x=1; x < 17; x += 1){
      XCoordinates.push(random(50,550))
    }
      XCoordinates = sort(XCoordinates)
  
    for(let x=1; x < 21; x += 1){
      YCoordinates.push(random(50,550))
    }
      YCoordinates = sort(YCoordinates)
  
    xDistances = []
    for(let x=0; x<15; x+=1){
      xDistances.push(XCoordinates[x+1] - XCoordinates[x])
    }
    
    yDistances = []
    for(let x=0; x<19; x+=1){
      yDistances.push(YCoordinates[x+1] - YCoordinates[x])
    }
    print(yDistances)
    
    quadSize = {}
  
    for(let x=1; x<14; x+=1){
      for(let y=1;y<18; y+=1){
        quadSize[xDistances[x]*yDistances[y]] = [XCoordinates[x], YCoordinates[y], XCoordinates[x+1], YCoordinates[y+1]]
      }
    }
  
    quadSizeKeys = Object.keys(quadSize)
    quadSizeKeys = sort(float(quadSizeKeys))
    print(quadSize)
  
}

// draw() is called 60 times per second
function draw() {
  
    let hr = hour();
    let min = minute();
    let sec = second();
  
    if(hour() == 0){
      hr = 12
    }else if(hour() < 13){
      hr = hr
    }else{
      hr = hr%12
    }
  
    for(let x = 0; x<hr; x+=1){
      fill('yellow')
      
      let sizeCopy = [] 
      sizeCopy = arrayCopy(quadSizeKeys, sizeCopy)
      
      //let temp1 = (sizeCopy.length - x).toString()
      let temp2 = []
      //temp2 = arrayCopy(quadSize[temp1])
      
    }
    
    for(let x=0; x<min; x+=1){
      
    }
  
  erase()
  line(0,300,300,0)
  line(300,0,600,300)
  line(600,300,300,600)
  line(300,600,0,300)
  noErase()
  strokeWeight(1)
  line(0,300,300,0)
  line(300,0,600,300)
  line(600,300,300,600)
  line(300,600,0,300)
  
    for(let x=0;x<12;x+=1){
      if(XCoordinates[x] <= 300){
        line(XCoordinates[x], 300+XCoordinates[x], XCoordinates[x], 300-XCoordinates[x])
      }else{
        line(XCoordinates[x], 600 - XCoordinates[x]%300, XCoordinates[x], 0 + XCoordinates[x]%300)
      }
    }
    
    for(let x=0;x<20;x+=1){
      if(YCoordinates[x] <= 300){
        line(300-YCoordinates[x], YCoordinates[x], 300 + YCoordinates[x], YCoordinates[x])
      }else{
        line(600 - YCoordinates[x]%300, YCoordinates[x], 0 + YCoordinates[x]%300, YCoordinates[x])
      }
    }
  
  for(let x=0; x<sec+1; x+=1){
    if(x<15){
      strokeWeight(5)
      line(0,300,(x+1) * 20, 300 - (20*(x+1)))
    }else if(x>14 && x<30){
      strokeWeight(5)
      line(300,0, 300 + ((x-13)*20), (20*(x-13)))
    }else if(x>29 && x<45){
      strokeWeight(5)
      line(600,300, 600 - (20*(x-28)), 300 + (20*(x-28)))
    }else if(x>44){
      strokeWeight(5)
      line(300,600,300 - (20*(x-43)), 600 - (20*(x-43)))
    }
  }
  
}