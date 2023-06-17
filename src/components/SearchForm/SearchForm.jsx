import { DebounceInput } from 'react-debounce-input';
import css from './SearchForm.module.css';

const SearchForm = ({ request, handleSubmit }) => {
  return (
    <form className={css.input_container}>
      <DebounceInput
        className={css.search_form__input}
        minLength={2}
        debounceTimeout={1500}
        type="text"
        name="search"
        value={request}
        onChange={handleSubmit}
      />
      <button
        className={css.search_form_btn}
        type="submit"
        onSubmit={handleSubmit}
      >
        Search movie
      </button>
    </form>
  );
};

export default SearchForm;
