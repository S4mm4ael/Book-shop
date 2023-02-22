export  function defineRoute(category: string | undefined) {
  let categoryRu = '';

  switch (category) {
    case ':business':
      categoryRu = 'Бизнес';
      break;
    case ':psychology':
      categoryRu = 'Психология';
      break;
    case ':parents':
      categoryRu = 'Родителям';
      break;
    case ':non-fiction':
      categoryRu = 'Нон-фикшн';
      break;
    case ':fiction':
      categoryRu = 'Художественная литература';
      break;
    case ':programming':
      categoryRu = 'Программирование';
      break;
    case ':hobby':
      categoryRu = 'Хобби';
      break;
    case ':design':
      categoryRu = 'Дизайн';
      break;
    case ':childish':
      categoryRu = 'Детские';
      break;
    case ':other':
      categoryRu = 'Другое';
      break;
    default:
      categoryRu = 'Бизнес книги';
      break;
  }

  return categoryRu;
}
