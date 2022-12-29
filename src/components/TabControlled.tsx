import { useRef } from 'react';

interface TabPaneProps {
    children: string,
    title: string,
}

interface CommonTabProps {
    children: JSX.Element[],
}

type ConditionalTabProps = 
    | {
        initialActive?: number,
        active?: never,
        onActiveChange?: never,
      }
    | {
        initialActive?: never,
        active?: number | undefined,
        onActiveChange?: Function,
      }

type TabProps = CommonTabProps & ConditionalTabProps  

const Tab = ({ children, initialActive = 0, onActiveChange, active } : TabProps ) => {
    const tabsData = children
    let actualBody = active ? tabsData[active].props.children : tabsData[initialActive].props.children
    
    const itensList = useRef<any>([])
    const divBody = useRef<any>(null)

    const addItem = (elem: any) => {
        if(elem && !itensList.current.includes(elem)){
            itensList.current.push(elem)
        }
    }

    const handleTabClick = onActiveChange ? (index: number) => {
        onActiveChange(index)
    } : (index: number) => {
        itensList.current.forEach((item: any, idx: number) => {
            item.classList.remove("active")
            if(index === idx){
                item.classList.add("active")
                divBody.current.innerText = tabsData[idx].props.children
            }
        }) 
    }

    const isActive = (index:number) => {
        if(active !== undefined){
            if(index === active){
                return true
            }
            return false
        }
        if(index === initialActive){
            return true
        }
        return false
    }

    if(initialActive > children.length) return null

    return (
        <div className="tab">
            <ul className="tab__list">
                {tabsData.map((item, index) => (
                    <li key={`item-${index}`} className="tab__list-item">
                        <button                         
                        ref={addItem}
                        className={`tab__list-button ${isActive(index) ? "active" : ""}`} 
                        onClick={() => handleTabClick(index)}>
                            {item.props.title}
                        </button>
                    </li>
                ))}
            </ul>
            <div ref={divBody}  className="tab__content">
                 {actualBody && actualBody}
            </div>
        </div>
    )
}

const TabPane = ({ children }: TabPaneProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

Tab.Pane = TabPane;

export default Tab;