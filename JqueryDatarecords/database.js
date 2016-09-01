$(document).ready(function () {
$("#viewall").hide();

  var table=$("#results");
  var tbody=$("#results tbody");
  var tmp = $('#id23').html();
 
  $.ajax({

   url:'http://localhost:3000/db?_start=0&_end=20',
   type:'GET',
   datatype: 'JSON',
   success: function(data)
   {

    $(data).each(function(index,value)

    {

     tbody.append(Mustache.render(tmp,value));


   });

  },
   error:function(){
   alert("error loading page");
 }


});
  //Search button function

  $("#search").click(function(){

   var id=$("#title").val();
   

   if($.trim(id)==="")
   {
    alert("Empty search field");

  }
	
  else
  {
    $("#viewall").show();

    tbody.empty();

    $.ajax({


     url:'http://localhost:3000/db/'+id,
     type:'GET',
     datatype: 'JSON',
     success: function(data)
     {


      $(data).each(function(index,value)

      {

       tbody.append(Mustache.render(tmp,value));

     });

    },
    error:function(){
   alert("error searching data");
 }


  });
  }


}); //End of search button function

  ////Viewall button function
  $("#viewall").click(function(){

    $("#viewall").hide();
   tbody.empty();
   var title=$("#title");
   title.val('');


   $.ajax({


     url:'http://localhost:3000/db?_start=0&_end=20',
     type:'GET',
     datatype: 'JSON',
     success: function(data)
     {

      $(data).each(function(index,value)

      {

        tbody.append(Mustache.render(tmp,value));

      });

    },
    error:function(){
   alert("Error loading page");
 }


  });


 });////End of viewall button function


  //Submit button (in modal) function
  $("#submitter").click(function(){

  var inputbalance=$("#inputbalance");
  var inputname=$("#inputname");
  var inputgender=$("#inputgender");
  var inputcompany=$("#inputcompany");
  var inputemail=$("#inputemail");

    var s1=$.trim($("#inputgender").val()).toLowerCase();
    var s2="male";
    var s3="female";
    var n=s1.localeCompare(s2);
    var m=s1.localeCompare(s3);

   if ($.trim($("#inputbalance").val()) === "")
   {
    alert('Please fill out the balance field');
    return false;

  }
  else if($.trim($("#inputname").val()) === "")
  {
    
    alert('Please fill out the name field');
    return false;
  } else if($.trim($("#inputgender").val()) === "")
  {
    alert('Please fill out the gender field');
    return false;
  }
   else if($.trim($("#inputcompany").val()) === "")
  {
    alert('Please fill out the company field');
    return false;
  }
   else if($.trim($("#inputemail").val()) === "")
  {
     alert('Please fill out the email field');
    return false;
  }
  else
    if(!($.trim($("#inputname").val()).match(/^[a-zA-Z]+$/))||!($.trim($("#inputgender").val()).match(/^[a-zA-Z]+$/))||!($.trim($("#inputcompany").val()).match(/^[a-zA-Z]+$/)))
    {
      alert("Only Alphabet allowed");
      return false;

    }
    
      else
        if(!(n==0||m==0))
        {
          alert("Enter the valid gender");
          return false;

        }
        else
          if(!($.trim($("#inputemail").val()).match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)))
          {
            alert("Invalid email format");
            return false;
          }


 

else{

	var adder ={
		
		balance:inputbalance.val(),
		name: inputname.val().toUpperCase(),
		gender: inputgender.val().toUpperCase(),
		company: inputcompany.val().toUpperCase(),
		email: inputemail.val().toLowerCase()
    	};


  $.ajax({


   url:'http://localhost:3000/db',
   type:'POST',
   datatype:'JSON',
   data:adder,
   success: function(data)

   {


    $(data).each(function(index,value)

    {

      tbody.append(Mustache.render(tmp,value));

    });

  },
  error:function(){
   console.log("error loading page");
 }


});

}
});//End of submit button(in modal) function

  //Delete button function
  tbody.delegate('.remove','click',function(){

    var set=confirm("Are you sure you want to delete");

    if(set)
    {

   var id=$(this).closest('tr');
   $.ajax({
    type:'DELETE',
    url:'http://localhost:3000/db/'+$(this).attr('data-id'),
    success:function (){
      id.fadeOut(1000,function(){
       id.remove();

     });

    },
    error:function(){

   alert("error in removing data ");


 }

  });
 }



 });////End of delete button function

  tbody.delegate('.editt','click',function(){

   var par=$(this).closest('tr');


   par.find('input.id').val(par.find('span.id').html()); 
   par.find('input.balance').val(par.find('span.balance').html()); 
   par.find('input.name').val(par.find('span.name').html()); 
   par.find('input.gender').val(par.find('span.gender').html());
   par.find('input.company').val(par.find('span.company').html()); 
   par.find('input.email').val(par.find('span.email').html()); 
   par.addClass('edit');
   

 });

  //Cancel button function

  tbody.delegate('.cancel','click',function(){


   $(this).closest('tr').removeClass('edit'); 




 });//End of cancel button

  //save button function

  tbody.delegate('.save','click',function(){

    var par=$(this).closest('tr');
    //console.log(par.find('input.balance').val());
    var s1=$.trim(par.find('input.gender').val()).toLowerCase();
    alert
    var s2="male";
    var s3="female";
    var n=s1.localeCompare(s2);
    var m=s1.localeCompare(s3);

    /*if(!($.trim(par.find('input.balance').val()).match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)))
    {
       alert("Only digits allowed");
    }*/

     if($.trim(par.find('input.balance').val()) ==="")
    {
      alert("Empty balance fields");

    }
    else if($.trim(par.find('input.name').val()) === "")
    {
      alert("Empty name fields");
    }
    else if($.trim(par.find('input.gender').val()) === "")
    {
      alert("Empty gender fields");
    }
     else if($.trim(par.find('input.company').val()) === "")
    {
      alert("Empty company fields");
    }
     else if($.trim(par.find('input.email').val()) === "")
    {
    alert("Empty email fields");
    }
    else
      if(!($.trim(par.find('input.name').val().match(/^[a-zA-Z]+$/)))||!($.trim(par.find('input.gender').val().match(/^[a-zA-Z]+$/)))||!($.trim(par.find('input.company').val().match(/^[a-zA-Z]+$/))))
      {
        alert("Only Alphabet allowed");
      }
      else
        if(!($.trim(par.find('input.email').val()).match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)))
        {
          alert("Invalid Email format");

        }
        else
          if(!(n==0||m==0))
          {
            alert("Enter valid gender");
          }
     else
    {


   var adderr ={
      
      id:par.find('input.id').val(),
      balance:par.find('input.balance').val(),
      name: par.find('input.name').val().toUpperCase(),
      gender: par.find('input.gender').val().toUpperCase(),
      company:par.find('input.company').val().toUpperCase(),
      email: par.find('input.email').val().toLowerCase(),
    };

    $.ajax({
      type:'PUT',
      url:'http://localhost:3000/db/'+par.attr('data-id'),
      data:adderr,
      success:function (){
        alert(par.find('input.balance').val());
       par.find('span.id').html(adderr.id);
       par.find('span.balance').html(adderr.balance);
       par.find('span.name').html(adderr.name);
       par.find('span.gender').html(adderr.gender);
       par.find('span.company').html(adderr.company);
       par.find('span.email').html(adderr.email);

       par.removeClass('edit');


     },
     error:function(){
       alert("Error in saving data");

     }



   });
     
  }

});//End of save button function


//Infinite scroll 

  var start=0;
  var end =20;
  $(window).scroll(function()
  {
    if($(window).scrollTop() == $(document).height() - $(window).height())
    {
      $('#loadmoreajaxloader').show(250);
      $.ajax({

        url: 'http://localhost:3000/db?_start='+(start+20)+'&_end='+(end+20),
        success: function(html)
        {
          start = start+20;
          end = end+20;

          if(html)
          {
            $("#postswrapper").append(html);
            $(html).each(function(index,html)

            {

              tbody.append(Mustache.render(tmp,html));


            });


               $('#loadmoreajaxloader').hide();
             }
             else
             {
              $('#loadmoreajaxloader').html('<center>No more posts to show.</center>');
            }
          }
        });
    }
  });


});


