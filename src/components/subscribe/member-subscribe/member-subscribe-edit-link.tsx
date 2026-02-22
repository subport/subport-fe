import { Link, useParams } from 'react-router-dom';

function MemberSubscribeEditLink() {
  const { memberSubscribeId } = useParams();

  return (
    <Link
      className="text-sm"
      to={`/member-subscribe/${memberSubscribeId}/edit`}
    >
      편집
    </Link>
  );
}

export default MemberSubscribeEditLink;
