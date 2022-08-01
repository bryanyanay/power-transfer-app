import styles from '../styles/table.module.css';

// the children are specifically the rows, <tr> with <td> inside them
export default function Table({wide, cols, children}: {wide: boolean, cols: string[], children: React.ReactNode}) {
  return (
    <table className={wide ? styles["wide-table"] : styles.table}>
      <thead className={wide ? styles["wide-header-row"] : styles["header-row"]}>
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