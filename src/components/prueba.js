const d= ()=>{
    var s =[0,1,2,3];
    s.sort();
    for(var i=0;i<s.length;i++) {
        if (s[i] + 1 != s[i+1] )
        {
            return s[i] + 1;
        }



    }
    return s[s.length-1]+1;

}

