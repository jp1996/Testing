//import { MouseEvent } from "react";

import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;

  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const message = items.length === 0 && <p>No item found</p>;

  //const handleClick = (event: MouseEvent) => console.log(event);

  const getMessage = () => {
    return items.length === 0 ? <p>No item found</p> : null;
  };

  return (
    <>
      <h1>{heading}</h1>
      {message}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
