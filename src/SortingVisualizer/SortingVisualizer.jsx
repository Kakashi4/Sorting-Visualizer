import React from 'react';
import './SortingVisualizer.css';
import './SortingAlgos/SortingAlgos';
import {selectionSortOutside, mergeSortOutside, bubbleSortOutside, heapSortOutside} from './SortingAlgos/SortingAlgos';
import { quickSortOutside, shellSortOutside } from '../../../../treej/my-app/src/SortingVisualizer/SortingAlgos/SortingAlgos';

const ANIMATION_MS_DELAY = 10;
const PRIMARY_COLOUR = 'black';
const SECONDARY_COLOUR = 'yellow';
const TERTIARY_COLOUR = 'red';
const QUARTERNARY_COLOUR = 'purple';


export default class SortingVisualizer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {array : [],};
        this.resetArray();
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 135; i++) {
            array.push(randomInt(10, 500));
        }
        array.push(500);
        this.setState({array});
        var arrayBars = document.getElementsByClassName("array-bar");
        for (let bar of arrayBars) {
            bar.style.backgroundColor = PRIMARY_COLOUR;
        }
    }

    
    mergeSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOUR;
            arrayBars[i].style.height = `${this.state.array[i]}px`;
        }
        const animations = mergeSortOutside(this.state.array.slice());
        for (let i = 0; i < animations.length; i++) {
            const isCompare = i % 4 < 2;
            if (isCompare) {
                const [barOne, barTwo] = animations[i];
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;
                const colour = i % 4 === 1 ? PRIMARY_COLOUR : SECONDARY_COLOUR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = colour;
                    barTwoStyle.backgroundColor = colour;
                }, i * ANIMATION_MS_DELAY);
            }
            else {
                const [bar, height] = animations[i];
                const barStyle = arrayBars[bar].style;
                const colour = i % 4 === 2 ? TERTIARY_COLOUR : PRIMARY_COLOUR;
                setTimeout(() => {
                    barStyle.backgroundColor = colour;
                    barStyle.height = `${height}px`;
                }, i * ANIMATION_MS_DELAY);
            }
        }
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = QUARTERNARY_COLOUR;
            }, ANIMATION_MS_DELAY * (animations.length + i));
        }
    }

    heapSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOUR;
            arrayBars[i].style.height = `${this.state.array[i]}px`;
        }
        const animations = heapSortOutside(this.state.array.slice());
        
        for (let i = 0; i < animations.length; i++) {
            console.log(animations[i]);
            const [barIdx, height, type] = animations[i];
            let colour = PRIMARY_COLOUR;
            switch (type) {
                case 1:
                    colour = PRIMARY_COLOUR;
                    break;
                case 2:
                    colour = SECONDARY_COLOUR;
                    break;
                case 3:
                    colour = TERTIARY_COLOUR;
                    break;
                case 4:
                    colour = QUARTERNARY_COLOUR;
                    break;
            }
            setTimeout(() => {
                arrayBars[barIdx].style.backgroundColor = colour;
                arrayBars[barIdx].style.height = `${height}px`;
            }, ANIMATION_MS_DELAY * i);
        }
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = QUARTERNARY_COLOUR;
            }, ANIMATION_MS_DELAY * (animations.length + i));
        }
    }

    quickSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOUR;
            arrayBars[i].style.height = `${this.state.array[i]}px`;
        }
        const animations = quickSortOutside(this.state.array.slice());
        let prevPartition = 0;
        for (let i = 0; i < animations.length; i++) {
            const type = animations[i][2];
            var barOne = 1;
            var barTwo = 2;
            if(type === 3) {
                barOne = prevPartition;
                barTwo = animations[i][0];
                prevPartition = barTwo;
            }
            else {
                barOne = animations[i][0];
                barTwo = animations[i][1];
            }
            const barOneStyle = arrayBars[barOne].style;
            const barTwoStyle = arrayBars[barTwo].style;

            switch (type) {
                case 0:
                    setTimeout(() => {
                        barOneStyle.backgroundColor = SECONDARY_COLOUR;
                        barTwoStyle.backgroundColor = SECONDARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;

                case 1:
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOUR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;
                    
                case 2:
                    let height1 = animations[i][3];
                    let height2 = animations[i][4];
                    setTimeout(() => {
                        barOneStyle.backgroundColor = TERTIARY_COLOUR;
                        barTwoStyle.backgroundColor = TERTIARY_COLOUR;
                        barOneStyle.height = `${height2}px`;
                        barTwoStyle.height = `${height1}px`;
                    }, i * ANIMATION_MS_DELAY);
                    break;

                case 3:
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOUR;
                        barTwoStyle.backgroundColor = QUARTERNARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;
            }
        }
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = QUARTERNARY_COLOUR;
            }, ANIMATION_MS_DELAY * (animations.length + i));
        }
    }

    bubbleSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOUR;
            arrayBars[i].style.height = `${this.state.array[i]}px`;
        }
        const animations = bubbleSortOutside(this.state.array.slice());

        for (let i = 0; i < animations.length; i++) {
            const [barOne, barTwo, type] = animations[i];
            const barOneStyle = arrayBars[barOne].style;
            const barTwoStyle = arrayBars[barTwo].style;
            switch (type) {
                case 0: 
                    setTimeout(() => {
                        barOneStyle.backgroundColor = SECONDARY_COLOUR;
                        barTwoStyle.backgroundColor = SECONDARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;
                
                case 1: 
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOUR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;

                case 2:
                    let height1 = animations[i][3];
                    let height2 = animations[i][4];
                    setTimeout(() => {
                        barOneStyle.backgroundColor = TERTIARY_COLOUR;
                        barTwoStyle.backgroundColor = TERTIARY_COLOUR;
                        barOneStyle.height = `${height2}px`;
                        barTwoStyle.height = `${height1}px`;
                    }, i * ANIMATION_MS_DELAY);
                    break;
                }

            }
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = QUARTERNARY_COLOUR;
            }, ANIMATION_MS_DELAY * (animations.length + i));
        }
    }

    selectionSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOUR;
            arrayBars[i].style.height = `${this.state.array[i]}px`;
        }
        const animations = selectionSortOutside(this.state.array.slice());
        for (let i = 0; i < animations.length; i++) {
            const [barOne, barTwo, type] = animations[i];
            const barOneStyle = arrayBars[barOne].style;
            const barTwoStyle = arrayBars[barTwo].style;
            switch (type) {
                case 0:
                    
                    setTimeout(() => {
                        barOneStyle.backgroundColor = SECONDARY_COLOUR;
                        barTwoStyle.backgroundColor = SECONDARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;

                case 1:
                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOUR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;

                case 2: 
                    setTimeout(() => {
                        barOneStyle.backgroundColor = TERTIARY_COLOUR;
                        barTwoStyle.backgroundColor = TERTIARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;

                case 3:
                    let height1 = animations[i][3];
                    let height2 = animations[i][4];
                    setTimeout(() => {
                        barOneStyle.height = `${height2}px`;
                        barTwoStyle.height = `${height1}px`;
                    }, i * ANIMATION_MS_DELAY);
                    break;

                    
                case 4:
                    setTimeout(() => {
                        barTwoStyle.backgroundColor = PRIMARY_COLOUR;
                        barOneStyle.backgroundColor = QUARTERNARY_COLOUR;
                    }, i * ANIMATION_MS_DELAY);
                    break;
            }
        }
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = QUARTERNARY_COLOUR;
            }, ANIMATION_MS_DELAY * (animations.length + i));
        }
    }

    insertionSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOUR;
            arrayBars[i].style.height = `${this.state.array[i]}px`;
        }
        const animations = shellSortOutside(this.state.array.slice(), 1);
        for (let i = 0; i < animations.length; i++) {
            let [bar, height] = animations[i];
            let colour = PRIMARY_COLOUR;
            switch (animations[i][2]) {
                case 0:
                    colour = TERTIARY_COLOUR;
                    break;
                case 1:
                    colour = QUARTERNARY_COLOUR;
                    break;
                case 2: 
                    colour = PRIMARY_COLOUR;
                    break;
            }

            setTimeout(() => {
                arrayBars[bar].style.backgroundColor = colour;
                arrayBars[bar].style.height = `${height}px`;
            }, ANIMATION_MS_DELAY * i);   
        }
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = QUARTERNARY_COLOUR;
            }, ANIMATION_MS_DELAY * (animations.length + i));
        }
    }

    shellSort() {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOUR;
            arrayBars[i].style.height = `${this.state.array[i]}px`;
        }
        const animations = shellSortOutside(this.state.array.slice(), 2);
        for (let i = 0; i < animations.length; i++) {
            let [bar, height] = animations[i];
            let colour = PRIMARY_COLOUR;
            switch (animations[i][2]) {
                case 0:
                    colour = TERTIARY_COLOUR;
                    break;
                case 1:
                    colour = QUARTERNARY_COLOUR;
                    break;
                case 2: 
                    colour = PRIMARY_COLOUR;
                    break;
            }

            setTimeout(() => {
                arrayBars[bar].style.backgroundColor = colour;
                arrayBars[bar].style.height = `${height}px`;
            }, ANIMATION_MS_DELAY * i);   
        }
        for (let i = 0; i < arrayBars.length; i++) {
            setTimeout(() => {
                arrayBars[i].style.backgroundColor = QUARTERNARY_COLOUR;
            }, ANIMATION_MS_DELAY * (animations.length + i));
        }
    }

    render() {
        const {array} = this.state;
        return (
                <div className = "array-container">
                    {array.map((value, idx) => (
                    <div 
                        className = "array-bar"
                        key = {idx}
                        style = {{
                            backgroundColor: PRIMARY_COLOUR,
                            height : `${value}px`,
                            }}></div>
                    ))}
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button onClick={() => this.shellSort()}>Shell Sort</button>
                    <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                </div>
        );
    }
} 

function randomInt(x, y) {
    return Math.floor(x + Math.random() * (y - x + 1));
}

