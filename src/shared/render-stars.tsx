import starEmpty from '../assets/svg/star-empty.svg';
import star from '../assets/svg/star-fill.svg';

export function renderStars(stars: number | null) {
  const indents = [];

  if (stars) {
    for (let i = 0; i <= 5; i++) {
      indents.push(<img key={Math.random()} src={starEmpty} alt='star' height='22px' />);
    }
    for (let i = 1; i <= stars; i++) {
      indents.push(<img key={Math.random()} src={star} alt='star' height='22px' />);
    }
  }

  return indents.slice(-5).reverse();
}
