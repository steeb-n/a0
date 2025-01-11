//Vaguely Mondrian Clock

//Variables for later
var XCoordinates = [];
var YCoordinates = [];
var xDistances;
var yDistances;
var quadSize;
var quadSizeKeys;

// setup() is called once at page-load
function setup() {
    createCanvas(600,600); // make an HTML canvas element width x height pixels
  
  //Generate coordinates for vertical and horizontal lines
    randomSeed(78)
    for(let x=1; x < 17; x += 1){
      XCoordinates.push(random(50,550))
    }
      XCoordinates = sort(XCoordinates)
  
    for(let x=1; x < 21; x += 1){
      YCoordinates.push(random(50,550))
    }
      YCoordinates = sort(YCoordinates)
  
  //Calculate distances between adjacent lines
    xDistances = []
    for(let x=0; x<15; x+=1){
      xDistances.push(XCoordinates[x+1] - XCoordinates[x])
    }
    
    yDistances = []
    for(let x=0; x<19; x+=1){
      yDistances.push(YCoordinates[x+1] - YCoordinates[x])
    }
    
  //Roughly calculate areas of the quads formed by the lines and filter
    quadSize = {}  
    for(let x=0; x<14; x+=1){
      for(let y=0;y<18; y+=1){
        if(XCoordinates[x] + YCoordinates[y] < 300){
        }else if(XCoordinates[x+1] + YCoordinates[y+1] > 900){
        }else if(YCoordinates[y+1] > XCoordinates[x] + 300){
        }else if(XCoordinates[x+1] > YCoordinates[y] + 300){
        }else{
          quadSize[xDistances[x]*yDistances[y]] = [XCoordinates[x], YCoordinates[y], XCoordinates[x+1], YCoordinates[y+1]]
        }
      }
    }
  
    quadSizeKeys = Object.keys(quadSize)
    quadSizeKeys = sort(float(quadSizeKeys))
}

// draw() is called 60 times per second
function draw() {
  
    let hr = hour();
    let min = minute();
    let sec = second();
  
  //Set to 12 hour cycle
    if(hour() == 0){
      hr = 12
    }else if(hour() < 13){
      hr = hr
    }else{
      hr = hr%12
    }
  
  //cleaning of old shapes
  erase()
  line(0,300,300,0)
  line(300,0,600,300)
  line(600,300,300,600)
  line(300,600,0,300)
  quad(0,300,300,0,600,300,300,600)
  noErase()
  strokeWeight(1)
  line(0,300,300,0)
  line(300,0,600,300)
  line(600,300,300,600)
  line(300,600,0,300)
  
  //draw the vertical and horizontal lines
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
  
  //Make a copy of the keys array
    let sizeKeysCopy = [] 
    arrayCopy(quadSizeKeys, sizeKeysCopy)   
    
    //Draw the yellow hour quads
    for(let x = 0; x<=hr; x+=1){
      strokeWeight(1.5)
      fill('yellow')
      let temp1 = (sizeKeysCopy.length - 1) - x
      let temp2 = []
      arrayCopy(quadSize[sizeKeysCopy[temp1].toString()], temp2)
      if(x == 12){
        break
      }else if(x == hr){
        quad(temp2[0],temp2[1], temp2[0] + (temp2[2]-temp2[0])*min/60, temp2[1], temp2[0] + (temp2[2]-temp2[0])*min/60,temp2[3], temp2[0],temp2[3])
      }else{
        quad(temp2[0],temp2[1], temp2[2],temp2[1], temp2[2],temp2[3], temp2[0],temp2[3]) 
      }
    }
    
    //Draw the minute blue quads
    for(let x=0; x<min; x+=1){
      strokeWeight(1.5)
      fill('lightblue')
      let temp1 = (sizeKeysCopy.length - 13) - x
      let temp2 = []
      arrayCopy(quadSize[sizeKeysCopy[temp1].toString()], temp2)
      square(temp2[0],temp2[1], 15) 
    }
  
  //Seconds outline of shape
  for(let x=0; x<sec+1; x+=1){
    if(x<16){
      strokeWeight(3)
      line(0,300,x * 20, 300 - (20*x))
    }else if(x>14 && x<30){
      strokeWeight(3)
      line(300,0, 300 + ((x-14)*20), (20*(x-14)))
    }else if(x>29 && x<45){
      strokeWeight(3)
      line(600,300, 600 - (20*(x-29)), 300 + (20*(x-29)))
    }else if(x>44){
      strokeWeight(3)
      line(300,600,300 - (20*(x-44)), 600 - (20*(x-44)))
    }
  }
  
  //Print Minute
  if(sec == 0 && millis()%1000 < 25){
    print(min)
  }
  
}
