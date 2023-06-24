

const renderParticles = function()
{
    const path = new paper.Path();
    // // Give the stroke a color
    path.strokeColor = 'black';
    
    
    const dot_path = new paper.Path.Circle(new paper.Point(100, 70), 5);
    dot_path.fillColor = 'green';
    dot_path.opacity = 0.2
    const nParticles = 1000

    const velocities= Array.from(Array(nParticles).keys()).map ((i) => [ Math.random()*0.01 , Math.random()*0.01 ] )

    const initialPositions = Array.from(Array(nParticles).keys()).map ((i) => [ Math.random()*paper.view.size.width, Math.random()*paper.view.size.height]   )


    const dot_symbol = new paper.Symbol(dot_path)
    
    
    
    
    const dots = []

    for(let i=0;i<nParticles;i++)
    {
        const x = initialPositions[i][0]
        const y = initialPositions[i][1]
        
        dots.push( dot_symbol.place( new paper.Point(x,y ))  )

    }

    paper.view.onFrame=function(event) {    
        
        for ( var i =0 ; i < nParticles ; i++)
        {
            dots[i].position.x= ( dots[i].position.x + velocities[i][0]*paper.view.size.width ) % paper.view.size.width;

            dots[i].position.y= ( dots[i].position.y + velocities[i][1]*paper.view.size.height ) % paper.view.size.height;
            
    
        }
    }
    
}

window.onload = function() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('vectorFieldCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    renderParticles()


}






