import styles from './Social.module.scss'

export default function Social() {
  return (
    <div className={styles["social"]}>
      <a
        className={styles["social__link"]}
        href="https://www.facebook.com/profile.php?id=100001835656351"
        target="blank"
      >
        <div className={styles["social__facebook"]}></div>
      </a>
      <a
        className={styles["social__link"]}
        href="https://vk.com/evgeniyalexandrov"
        target="blank"
      >
        <div className={styles["social__vk"]}></div>
      </a>
      <a
        className={styles["social__link"]}
        href="https://www.youtube.com/channel/UC_w5B-9FkpI_jj0beRXjhRw?view_as=subscriber"
        target="blank"
      >
        <div className={styles["social__youtube"]}></div>
      </a>
      <a
        className={styles["social__link"]}
        href="https://www.instagram.com/evgeniy_alexandrov__/?hl=ru"
        target="blank"
      >
        <div className={styles["social__instagram"]}></div>
      </a>
      <a
        className={styles["social__link"]}
        href="https://soundcloud.com/evgeniyalexandrov"
        target="blank"
      >
        <div className={styles["social__soundcloud"]}></div>
      </a>
      <a
        className={styles["social__link"]}
        href="https://t.me/AES_Production"
        target="blank"
      >
        <div className={styles["social__telegram"]}></div>
      </a>
    </div>
  )
}
