import { linspace } from "./createWingShape.js"


const getAerofoil = function(){

        const m=0.1
        const t=0.1
        const p=0.4
        const c=2.


        const getHalfWing= function(x,half)
            {
                const xc=x/c


                const yt=5*t*(0.2969*Math.sqrt(xc) -0.1260*xc -0.3516*(xc*xc) + 0.2843*xc*xc*xc - 0.1015*xc*xc*xc*xc )

                
                //yc=np.append(ycl,ycu)

                
                if (half=="upper")
                {
                    const yc = m*(c-x)/(1-p)/(1-p) * (1+xc-2*p)

                    const tantheta = 2*m/(1-p)**2 * (p-xc)
                    const xu = x
                    const theta = Math.atan(tantheta)

                    const yu = yc + yt*Math.cos(theta )

                    return [xu,yu]                    

                }
                else if ( half == "lower")
                {
                    const yc = m*x/p/p * (2*p-xc)
                    const tantheta = 2*m/p/p * (p-xc)
                    const theta = Math.atan(tantheta)

                    const xl = x
                    const yl = yc - yt*Math.cos(theta)

                    return [xl,yl]

                
                }


            }
        
        
        const xl= linspace(0,p*c,40)
        const xu= linspace(p*c,c,60)
        const xyl = xl.map( (x)=> getHalfWing(x,"lower")  )
        const xyu = xu.map( (x)=> getHalfWing(x,"upper")  )

        const xy = xyl.concat(xyu)

        return xy
}

console.log( getAerofoil() )