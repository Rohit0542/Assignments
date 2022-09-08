  const eventObject = {
    buttonList: document.getElementsByTagName('button'),  // retrieve all the button element

    // function for hide and show of button based on input value
    // i.e if input value is Item 1 then it will show only Item 1 button and Item 2 will be hidden and respectively.
    // if text not matched it will hide both the buttons

    toggleButton: function(input) {  
      for (var i = 0; i < this.buttonList.length; i++) {
        let button = this.buttonList[i];
        if (
          input.value.length > 0 && button.innerHTML !== input.value &&
          (button.innerHTML !== ' ' || button.innerHTML !== '') // empty checking
        ) {
          button.style.visibility = 'hidden'; // hide the dom element -> using visibility instead of display because block property will align in next row.
        }  else {
          button.style.visibility = 'visible'; // show the dom element
        }
      }
    }
  };

  // Trigger on click of buttons 
  
  function onButtonTap(buttonValue) {
    var inputText = document.getElementById('input');
    inputText.value = buttonValue.innerHTML.trim(); // button text assigning to input value
    eventObject.toggleButton(inputText);
  }

  // Trigger when change in input text 
  
  function inputChange() {
    var inputText = document.getElementById('input'); // retrieve the input box value
    eventObject.toggleButton(inputText);  // passing to function to hide and show button based on input value
  }
  
  
