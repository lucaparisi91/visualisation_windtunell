
const reshape2D= function(arr, size)
{
    const reshaped_arr=[]
    for ( let i=0; i<size[0]*size[1];i+=size[1] )
    {
        reshaped_arr.push(  arr.slice(i,i+size[1])   )
    }

    return reshaped_arr
}

const pbc = function( i, n )
{
    if (i>=0)
    {
        return i%n
    }
    else
    {
        return i + (Math.floor(Math.abs(i)/n) +1 ) *n
    }
}

class field2D
{
    constructor(x,y,values)
    {
        this.x=x
        this.y=y
        this.field=values
        this.shape=[x.length,y.length ]

        //this.field=reshape2D(values,this.shape)
        this.minx=d3.min(x)
        this.maxx=d3.max(x)
        this.dx=(this.maxx-this.minx)/this.shape[0]

        this.miny=d3.min(y)
        this.maxy=d3.max(y)
        this.dy=(this.maxy-this.miny)/this.shape[1]



    }

    interpolate( x , y )
    {

        
        let i=(parseInt(Math.floor( (x - this.minx)/this.dx ) ) )%this.shape[0]
        i=pbc(i,this.shape[0])
        let j=parseInt(Math.floor( (y - this.miny)/this.dy ) )%this.shape[1]
        j=pbc(j,this.shape[1])

        return this.field[i][j]



    }

}

class windTunnelField
{

    constructor( buffer )
    {
        let offset=0
        this.shape = new Int32Array(buffer.slice(offset, 2 * 4) )
        offset+=2 * 4


        const x = new Float32Array(buffer.slice(offset,offset+this.shape[0]*4) )
        offset = offset + this.shape[0]*4

        const y = new Float32Array(buffer.slice(offset,offset+this.shape[1]*4) )
        offset = offset + this.shape[1]*4

        //this.psi = new Float32Array(buffer.slice(offset,offset+this.shape[0]*this.shape[1]*4) )
        offset = offset + this.shape[1]*this.shape[0]*4

        //this.mask = new Int32Array(buffer.slice(offset,offset+this.shape[0]*this.shape[1]*4) )
        offset = offset + this.shape[1]*this.shape[0]*4

        this.u = new Float32Array(buffer.slice(offset,offset+this.shape[0]*this.shape[1]*4) )
        offset = offset + this.shape[1]*this.shape[0]*4
        this.u=reshape2D(this.u,this.shape)
        this.u= new field2D(x,y,this.u)

        this.v = new Float32Array(buffer.slice(offset,offset+this.shape[0]*this.shape[1]*4) )
        offset = offset + this.shape[1]*this.shape[0]*4
        this.v=reshape2D(this.v,this.shape)
        this.v= new field2D(x,y,this.v)

        //const xScale = d3.scaleLinear().domain([d3.min(x),d3.max(x)]).range([0,200])

    }


}


//readFile('output.dat', (err, data) => {
//    if (err) throw err;
//    const field = new windtunnelField(data.buffer);
//
//    console.log(field.v )
    

//  });

export { windTunnelField, field2D }