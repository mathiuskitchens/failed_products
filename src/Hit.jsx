import { Highlight } from "react-instantsearch";
import { getPropertyByPath } from 'instantsearch.js/es/lib/utils';

export const Hit = ({ hit }) => {
  return (
    <article>
      <div className="hit-Name">
			  <Highlight attribute="Name" hit={hit} />
			</div>
			<div className="hit-Description">
			  <Highlight attribute="Description" hit={hit} />
			</div>
			<div className="hit-Price">
			  <Highlight attribute="Price" hit={hit} />
			</div>
    </article>
  );
};