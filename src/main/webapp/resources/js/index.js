$(document).ready(function ()
{
  let action = "show";
  $.ajax({
    type: 'POST',
    url: '/frizzybee/miniCart',
    data: {action: action},
    success: function (response)
    {
      document.querySelector(".mini-cart-icon").innerHTML = response;
      addRemoveButton();
    },
    error: function (xhr)
    {
      console.log(xhr.responseText)
      alert('Error show request.');
    }
  });
});

function addRemoveButton()
{
  let closeButton = document.querySelectorAll(".removeProduct");
  if (closeButton != null) {
    closeButton.forEach(element =>
    {
      let productId = element.className.split(" ")[ 1 ].split("_")[ 1 ];
      let action = "remove";
      element.addEventListener("click", function (event)
      {
        event.preventDefault();
        $.ajax({
          type: 'POST',
          url: '/frizzybee/cart',
          data: {id: productId, action: action},
          success: function (response)
          {
            showMiniCart("show");
            showCart("show");
          },
          error: function ()
          {
            alert('Error remove request.');
          }
        });
      });
    });
  }
}

let dropdown = document.querySelector('.dropdown');
let dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdown != null){
  dropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });
}
document.addEventListener('click', function (event) {
  if (!dropdown.contains(event.target)) {
    dropdownMenu.classList.remove('show');
  }
});