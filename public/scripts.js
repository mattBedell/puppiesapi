function getAllPuppies() {
  return fetch('/api/puppies')
    .then(r => r.json());
}

function adoptPuppy(payload) {
  return fetch('/api/puppies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

function likePuppy(payload) {
  return fetch('/api/puppies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(payload)
  }).then(getAllPuppies().then(renderPuppies))
}

function abandonPuppy(payload) {
  return fetch('/api/puppies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify(payload)
    }).then(getAllPuppies().then(renderPuppies))
}


function renderPuppies(puppies) {
  const $container = $('.adopted-puppies').empty();
  for (let i = 0; i < puppies.length; i += 1) {
    const $newPuppy = $('.puppy-template').clone();

    $newPuppy.removeClass('puppy-template')
      .addClass('puppy')
      .find('.name').text(puppies[i].name);

    $newPuppy
      .find('.likes').text(puppies[i].likes);

    $newPuppy
      .find('.abandon-puppy')
      .prop('id', puppies[i].id);

    $newPuppy
      .find('.puppy-picture img')
      .attr('src', puppies[i].url);

    $newPuppy
    .find('.myLikeBtn')
    .attr('puppyId', puppies[i].id)

    $newPuppy
    .find('.myDeleteBtn')
    .attr('puppyId', puppies[i].id)


    // you should add a button for abandoning here

    $container.append($newPuppy);
  }
}
function registerLikeButtonHandler() {
  console.log('called');
  $('.adopted-puppies').on('click', '.myLikeBtn', function() {
    console.log('clicked');
    const myBtn = $(this);
    const puppyLike = {
      puppy: myBtn.attr('puppyId')
    }
    likePuppy(puppyLike)
  })
}
function registerAbandonButtonHandler() {
  $('.adopted-puppies').on('click', '.myDeleteBtn', function() {
    console.log('clicked');
    const myBtn = $(this);
    const puppyAbandon = {
      puppy: myBtn.attr('puppyId')
    }
    abandonPuppy(puppyAbandon)
  })
}


function registerFormHandler() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const $form = $(this);
    const puppy = {
      name: $form.find('[name=name]').val(),
      url: $form.find('[name=url]').val()
    };

    adoptPuppy(puppy).then(() => {
      getAllPuppies().then(renderPuppies);
    });
  });
}


$(() => {
  registerFormHandler();
  registerAbandonButtonHandler();
  getAllPuppies().then(renderPuppies);
  registerLikeButtonHandler();

});
