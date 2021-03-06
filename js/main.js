/* ======= Model ======= */

var model = {
  currentCat: null,
  adminShow: false, //hides the admin display area.

  init: function () {
    this.currentCat = this.cats[0];
  },
  incrementCurrentCat: function () {
    this.currentCat.clickCount++;
  },
  setCurrentCat(catIndex) {
    this.currentCat = this.cats[catIndex];
  },

  cats: [
    {
      clickCount: 0,
      name: "Harold",
      imgSrc:
        "https://s-media-cache-ak0.pinimg.com/736x/b6/e8/5f/b6e85f2631fd74df894418a7ac51abc3.jpg",
    },
    {
      clickCount: 0,
      name: "Maple",
      imgSrc:
        "https://s-media-cache-ak0.pinimg.com/736x/65/09/0b/65090ba68e4d61f8f203a76a91e6cd29.jpg",
    },
    {
      clickCount: 0,
      name: "Grumpy Cat",
      imgSrc:
        "https://media.wired.com/photos/5cdf22ef24c89139f9895efe/master/pass/Tech-In-Two-Grumpy-Cat-453408502.jpg",
    },
    {
      clickCount: 0,
      name: "Marie",
      imgSrc:
        "https://s-media-cache-ak0.pinimg.com/736x/d8/1f/53/d81f53608e1c359cfd14c770fa502a66.jpg",
    },
    {
      clickCount: 0,
      name: "Crookshanks",
      imgSrc:
        "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg",
    },
  ],
};

/* ======= Octopus ======= */

var octopus = {
  //init function initalizes with the begining data. Keep out of the DOM.
  init: function () {
    //set the current cat to the first one on the list

    model.init();
    //tell our views to initialize.
    catListView.init();
    catView.init();
    adminView.init();
    adminView.hide();
  },

  getCurrentCat: function () {
    return model.currentCat;
  },

  //calls the array of cats.
  getCats: function () {
    return model.cats;
  },

  //sets the new cat.
  setCurrentCat: function (catIndex) {
    model.setCurrentCat(catIndex);
  },

  //increments the counter for the currently-selected cat.
  incrementCounter: function () {
    model.incrementCurrentCat();
    catView.render();
  },
  //function runs when 'Admin' button is clicked.
  adminDisplay: function () {
    if (model.adminShow === false) {
      model.adminShow = true;
      adminView.show(); //displays the admin input boxes and buttons
    } else if (model.adminShow === true) {
      model.adminShow = false;
      adminView.hide(); // hides the admin input boxes and buttons
    }
  },

  //hides admin display when cancel button is clicked.
  adminCancel: function () {
    adminView.hide();
  },

  //hides admin display and saves new cat data when save button is clicked.
  adminSave: function () {
    model.currentCat.name = adminCatName.value;
    model.currentCat.imgSrc = adminCatURL.value;
    model.currentCat.clickCount = adminCatClicks.value;
    catView.render();
    catListView.render();
    adminView.hide();
  },
};

/* ======= Views ======= */
var catView = {
  init: function () {
    this.content = document.getElementById("content");
    this.eventsBinding();
    this.render();
  },

  eventsBinding: function () {
    $(document).on("click", "#catImage", function () {
      octopus.incrementCounter();
    });
  },

  render: function () {
    var currentCat = octopus.getCurrentCat(); //calls the current cat from octopus
    this.content.innerHTML = this.cardTemplate(currentCat);
  },
  cardTemplate: function (cat) {
    return ` <div class= 'catDisplay'>
        <h2 id= 'catName'>${cat.name}</h2>
            <img src="${cat.imgSrc}" id='catImage' class="img-responsive" alt="cute cat">
            <p id= 'displayClicks'>${cat.clickCount}</p> 
    </div>`;
  },
};

var catListView = {
  init: function () {
    //store the DOM element for easy access.
    this.catList = document.getElementById("names");

    //update the DOM elements with the right values.
    this.render();
  },

  render: function () {
    var i, cat, catElem;

    //call the array of cats from octopus
    var cats = octopus.getCats();

    this.catList.innerHTML = "";

    //loop over each cat in our array of cats
    for (i = 0; i < cats.length; i++) {
      //This is the cat number that we are on
      cat = cats[i];

      //create a DOM element for each cat
      catElem = document.createElement("li"); //create li element
      catElem.textContent = cat.name; //fills the content of li with the cat's name

      //when the cat's name in the list is clicked, update the cat's picture
      catElem.addEventListener(
        "click",
        (function (i) {
          return function () {
            octopus.setCurrentCat(i);
            catView.render();
            octopus.incrementCounter(); //increments cat clicker
          };
        })(i)
      );

      this.catList.appendChild(catElem); //append li elements to the list
    }
  },
};

var adminView = {
  init: function () {
    this.adminCatName = document.getElementById("adminCatName");
    this.adminCatURL = document.getElementById("adminCatURL");
    this.adminCatClicks = document.getElementById("adminCatClicks");
    var admin = document.getElementById("admin");

    this.adminBtn = document.getElementById("adminBtn");
    this.adminCancel = document.getElementById("adminCancel");
    this.adminSave = document.getElementById("adminSave");

    this.adminBtn.addEventListener("click", function () {
      //shows the admin display.
      octopus.adminDisplay();
    });

    this.adminCancel.addEventListener("click", function () {
      //hides the admin display without saving any new cat data.
      octopus.adminCancel();
    });

    this.adminSave.addEventListener("click", function () {
      //hides the admin display and saves new cat data.
      octopus.adminSave();
    });

    this.render();
  },

  render: function () {
    var currentCat = octopus.getCurrentCat(); //calls current cat
    this.adminCatName.value = currentCat.name;
    this.adminCatURL.value = currentCat.imgSrc;
    this.adminCatClicks.value = currentCat.clickCount;
  },

  show: function () {
    admin.style.display = "block"; //shows the admin div on index.html
  },

  hide: function () {
    admin.style.display = "none";
  },
};

//make it go!
octopus.init();
