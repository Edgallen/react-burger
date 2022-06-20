import styles from './pages.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const returnHomeClick = (e: FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className={styles.notFound}>
      <h1 className="text text_type_main-large text_color_inactive">Страница не найдена</h1>
      <Button onClick={returnHomeClick}>
        Вернуться на главную
      </Button>
    </div>
  );
};