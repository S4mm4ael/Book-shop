import { useEffect, useState } from 'react';

import avatar from '../../assets/png/avatar-big.png';
import intersect from '../../assets/png/avatar-intersect.png';
import icon from '../../assets/svg/avatar-icon.svg';

import styles from './avatar-change.module.css';

export const AvatarChange = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  function setAvatarToLocalStore() {
    localStorage.removeItem('thumbnail');
    if (selectedImage) {
      const userAvatar = selectedImage;
      const reader = new FileReader();

      reader.readAsDataURL(userAvatar);
      reader.addEventListener('load', () => {
        if (reader.result) {
          localStorage.setItem('thumbnail', String(reader.result));
        }
      });
    }
  }

  function dataURLtoFile(dataUrl: string, filename: string) {
    if (!selectedImage) {
      const url = dataUrl;

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => setSelectedImage(new File([blob], filename, { type: 'image/png' })))
        .then(() => {
          console.log('uploaded');
        });
    }
  }

  function getAvatarFromLocalStore() {
    const thumbnail = localStorage.getItem('thumbnail');

    if (thumbnail) {
      dataURLtoFile(thumbnail, 'chachedAvatar');
    } else {
      console.log('nothing');
    }
  }

  useEffect(() => {
    getAvatarFromLocalStore();
  });

  return (
    <div>
      <div className={styles.Profile_avatarContainer}>
        <label className={styles.Profile__inputLabel} htmlFor='image-selector'>
          <img className={styles.Profile__avatarIntersect} src={intersect} alt='avatar-change' />
          <img className={styles.Profile__avatarIcon} height={32} src={icon} alt='avatar-icon' />
          <img
            className={styles.Profile__avatar}
            alt='not found'
            width='160px'
            height='160px'
            src={selectedImage ? URL.createObjectURL(selectedImage) : avatar}
          />
        </label>

        <input
          type='file'
          name='image'
          id='image-selector'
          className={styles.Profile_input}
          onChange={(event) => {
            if (event && event.target && event.target.files) {
              setSelectedImage(event.target.files[0]);
              setAvatarToLocalStore();
            }
          }}
        />
      </div>
    </div>
  );
};
