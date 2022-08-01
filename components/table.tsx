import styles from '../styles/table.module.css';

// the children are specifically the rows, <tr> with <td> inside them
export default function Table({cols, children}: {cols: string[], children: React.ReactNode}) {
  return (
    <table className={styles.table}>
      <thead className={styles["header-row"]}>
        <tr>
          {cols.map((col, idx) => {
            return <th key={idx}>{col}</th>
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}