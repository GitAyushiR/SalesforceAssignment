({
    submit: function(component, event, helper){
      
    },
    myChange: function(component, event, helper){
        console.log('hi');
       
        var myAttri = component.find("myAtt").get("v.value");
        console.log(myAttri);
    }
})