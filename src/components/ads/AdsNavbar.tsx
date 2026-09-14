import styles from '@/components/ads/ads.module.css';

/**
 * Reduced-exit navigation from the approved ad landing design (ADR 0013):
 * logo, three outbound links, and an anchor back to the first-screen form.
 */
export default function AdsNavbar() {
  return (
    <header className={styles.nav}>
      <span className={styles.logo}>FastGPT</span>
      <a className={styles.navLink} href="https://fastgpt.cn/price">
        定价
      </a>
      <a className={styles.navLink} href="https://doc.fastgpt.cn/zh-CN/guide/getting-started">
        文档
      </a>
      <a className={styles.navLink} href="https://solutions.fastgpt.cn/customers">
        案例中心
      </a>
      <span className={styles.spacer} />
      <a className={`${styles.btn} ${styles.solid}`} href="#form">
        商务咨询
      </a>
    </header>
  );
}
