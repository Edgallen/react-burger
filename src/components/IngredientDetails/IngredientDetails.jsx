import React from "react";
import styles from './IngredientDetails.module.css';
import {useSelector} from "react-redux";

const IngredientDetails = () => {
    const ingredient = useSelector(store => store.modal.ingredientModal.selectedIngredient);

    return (
        <div className={styles.module__container}>
            <img className={styles.module__img + ' mb-4'} src={ingredient.image_large}
                 alt={ingredient.name}/>

            <h2 className={'className="text text_type_main-medium" mb-8'}>{ingredient.name}</h2>

            <ul className={styles.module__info + ' mb-15'}>
                <li className={styles.module__card}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Калории, ккал</p>
                    <h3 className="text text_type_digits-default text_color_inactive">{ingredient.calories}</h3>
                </li>

                <li className={styles.module__card}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                    <h3 className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</h3>
                </li>

                <li className={styles.module__card}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                    <h3 className="text text_type_digits-default text_color_inactive">{ingredient.fat}</h3>
                </li>

                <li className={styles.module__card}>
                    <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                    <h3 className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</h3>
                </li>
            </ul>
        </div>
    )
};

export default IngredientDetails;