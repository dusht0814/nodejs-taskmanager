const add = (a,b) =>{
    return new Promise((result,reject)=>{
        setTimeout(()=>{
            result(a + b)
        },2000)
    })
}

const doWork = async () =>{
    const res = await add(1,2)
    const sum2 = await add(res,3)
    const sum3 = await add(sum2,3)
    return sum3
}

doWork().then((result)=>{
    console.log('result',result)
}).catch((e)=>{
    console.log(e)

})

