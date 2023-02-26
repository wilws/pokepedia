const State = (props: states) => {
  const { base_stat, effort, stat } = props;
  return (
    <li>
      {stat.name}
      {base_stat}
    </li>
  );
};

export default State;

