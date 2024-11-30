import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Resume Management Web App</h1>
      <p>
        This is a resume management web app that helps people manage resumes
        they have applied to different companies.
      </p>
    </div>
  );
};

export default Home;
