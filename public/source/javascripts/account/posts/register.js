$(() => {
  $('input[type="submit"]').on('click', (event) => {
    const $submitBtn = $(event.target);
    const $form = $submitBtn.parents('form');
    $form.attr('method', $submitBtn.data('method'));
    $form.attr('action', $submitBtn.data('action'));
    $form.trigger('submit');
  });
});
