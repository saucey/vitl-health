document.addEventListener("DOMContentLoaded",function(){

    //$(".cta").css({"opacity" : "0"})
    var cta = document.getElementById('cta');


//Get the button
var mybutton = document.getElementById("toTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener('click', ()=>{
  window.scrollTo({top: 0, behavior: 'smooth'});
    /*document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;*/
});

    //el.classList.add(className);

    window.addEventListener('scroll', function(e) {
      last_known_scroll_position = window.scrollY;

      if(window.scrollY > 60) {
        cta.style.display = 'block';
        cta.style.opacity = '1';
        cta.style.maxHeight = '6rem';
        cta.style.padding = '1rem 0';
        cta.style.top = '0';

       if( ! cta.classList.contains('animated') ) {
        cta.animate([
          // keyframes
          { transform: 'translateY(-110px)' }, 
          { transform: 'translateY(0px)' }
        ], { 
          // timing options
          duration: 400,
          iterations: 1
        });
        cta.classList.add('animated');
       }

      }
      else {
        if( cta.classList.contains('animated') ) {

          cta.animate([
            // keyframes
            { transform: 'translateY(0px)',
          //    opacity: '1',
          padding: '0',
              maxHeight: '5rem' }, 
            { transform: 'translateY(-110px)',
            padding: '0',
            // opacity: '0',
              maxHeight: '0' }
          ], { 
            // timing options
            duration: 400,
            iterations: 1
          });
          cta.style.maxHeight = '0';
           cta.style.padding = '0';
          cta.style.overflow = 'hidden';

        }


        cta.classList.remove('animated');

      }
    });

});
    
    // extend a Siema class by two methods
    // addDots - to create a markup for dots
    // updateDots - to update classes on dots on change callback
    class SiemaWithDots extends Siema {

      addDots() {
        // create a contnier for all dots
        // add a class 'dots' for styling reason
        this.dots = document.createElement('div');
        this.dots.classList.add('dots');

        // loop through slides to create a number of dots
        for(let i = 0; i < this.innerElements.length; i++) {
          // create a dot
          const dot = document.createElement('button');

          // add a class to dot
          dot.classList.add('dots__item');

          // add an event handler to each of them
          dot.addEventListener('click', () => {
            this.goTo(i);
          })

          // append dot to a container for all of them
          this.dots.appendChild(dot);
        }

        // add the container full of dots after selector
        this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
      }

      updateDots() {
        // loop through all dots
        for(let i = 0; i < this.dots.querySelectorAll('button').length; i++) {
          // if current dot matches currentSlide prop, add a class to it, remove otherwise
          const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
          this.dots.querySelectorAll('button')[i].classList[addOrRemove]('dots__item--active');
        }
      }
    }




// Extend prototype with method that adds arrows to DOM
// Style the arrows with CSS or JS — up to you mate
Siema.prototype.addArrows = function() {
    
  // make buttons & append them inside Siema's container
  this.prevArrow = document.createElement('button');
  this.nextArrow = document.createElement('button');
  //this.prevArrow.textContent = 'previous slide';
  this.prevArrow.classList.add('btn','btn-action','prev');
  this.prevArrow.innerHTML = '<i class="icon icon-arrow-left"></i>';
  this.nextArrow.classList.add('btn','btn-action','next');
  this.nextArrow.innerHTML = '<i class="icon icon-arrow-right"></i>';
  this.selector.appendChild(this.prevArrow)
  this.selector.appendChild(this.nextArrow)
  
  // event handlers on buttons
  this.prevArrow.addEventListener('click', () => this.prev());
  this.nextArrow.addEventListener('click', () => this.next());
}




    const siemas = document.querySelectorAll('.siema');

// this is fairly new way of looping through DOM Elements
// More about ithere: https://pawelgrzybek.com/loop-through-a-collection-of-dom-elements/
// For better compatibility I suggest using for loop
for(const siema of siemas) {
    // instantiate new extended Siema
    //const mySiemaWithDots =
    const instance = new SiemaWithDots({
      selector: siema,
      perPage: {
        800: 2, // 2 items for viewport wider than 800px
        992: 3 // 3 items for viewport wider than 1240px
      },
      // on init trigger method created above
      onInit: function(){
        this.addDots();
        this.updateDots();
      },

      // on change trigger method created above
      onChange: function(){
        //console.log('Just changed slide 🥑');
        this.updateDots()
      },
    });
    instance.addArrows();
}