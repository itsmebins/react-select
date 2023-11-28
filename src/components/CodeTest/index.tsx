import CustomSelect from '../CustomSelect'; 
import styles from './CodeTest.module.css'; 

const CodeTestContainer = () => {
    const options = ['Businessman', 'Employee', 'Freelancer', 'Retired'];
    const handleSelectItem = (value: string | null) => console.log(value)

    return (
        <div className={styles.container}>
            <div className={styles.topLeft}>
                <CustomSelect options={options} onSelect={handleSelectItem}
                id='topLeftSelect' label='Occupation'/>
            </div>
            <div className={styles.topRight}>
                <CustomSelect options={options} onSelect={handleSelectItem}
                id='topRightSelect' label='Occupation'/>
            </div>
            <div className={styles.bottomRight}>
                <CustomSelect options={options} onSelect={handleSelectItem}
                id='bottomRightSelect' label='Occupation'/>
            </div>
            <div className={styles.bottomLeft}>
                <CustomSelect options={options} onSelect={handleSelectItem}
                id='bottomLeftSelect' label='Occupation'/>
            </div>
            <div className={styles.center}>
                <CustomSelect options={options} onSelect={handleSelectItem}
                id='centerSelect' label='Occupation'/>
            </div>
        </div>
    );
};

export default CodeTestContainer;
