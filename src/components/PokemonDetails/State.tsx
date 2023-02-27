import { useState, useEffect } from "react";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

interface Props {
  stats: Array<states>;
  isParentReady: boolean;
}

let initial = true;
const State = (props: Props) => {

  const { stats } = props;

  const [hp,setHp] = useState<number>(0);
  const [attack,setAttack] = useState<number>(0);
  const [specialAttack,setSpecialAttack] = useState<number>(0);
  const [defend,setDefend] = useState<number>(0);
  const [specialDefense,setSpecialDefense] = useState<number>(0);
  const [speed,setSpeed] = useState<number>(0);

  const [_hp, _setHp] = useState<number>(0);
  const [_attack, _setAttack] = useState<number>(0);
  const [_specialAttack, _setSpecialAttack] = useState<number>(0);
  const [_defend, _setDefend] = useState<number>(0);
  const [_specialDefense, _setSpecialDefense] = useState<number>(0);
  const [_speed, _setSpeed] = useState<number>(0);

  const determineGraphSize = () => {
  
    const { innerWidth: width, innerHeight: height } = window;
    let _width = "280";
    let _height = "300"
  
    if (innerWidth <= 640) {
      _width = "4000";
      _height = "250";
    } else if (innerWidth >= 768) {
       _width = "500";
      _height = "320";
    }

    const svg = document.querySelector("svg")

    if (svg) {
      svg.setAttribute("width", _width);
      svg.setAttribute("height", _height);
    }
  };

  useEffect(() => {
    
    if (initial) {
      initial = false;
      return;
    }

    if (!props.isParentReady) {
      return;
    }

    setHp(stats[0].base_stat);
    setAttack(stats[1].base_stat);
    setSpecialAttack(stats[2].base_stat);
    setDefend(stats[3].base_stat);
    setSpecialDefense(stats[4].base_stat);
    setSpeed(stats[5].base_stat);


    determineGraphSize();

    const _hp_ = stats[0].base_stat / 100 > 1 ? 1 : stats[0].base_stat/100;
    const _attack_ =
      stats[1].base_stat / 100 > 1 ? 1 : stats[1].base_stat / 100;
    const _specialAttack_ =
      stats[2].base_stat / 100 > 1 ? 1 : stats[2].base_stat / 100;
    const _defend_ =
      stats[3].base_stat / 100 > 1 ? 1 : stats[3].base_stat / 100;
    const _specialDefend_ =
      stats[4].base_stat / 100 > 1 ? 1 : stats[4].base_stat / 100;
    const _speed_ = stats[5].base_stat / 100 > 1 ? 1 : stats[5].base_stat / 100;

    _setHp(_hp_);
    _setAttack(_attack_);
    _setSpecialAttack(_specialAttack_);
    _setDefend(_defend_);
    _setSpecialDefense(_specialDefend_);
    _setSpeed(_speed_);

  }, [props.isParentReady]);


  useEffect(() => {
    window.addEventListener("resize", determineGraphSize);
    return () => window.removeEventListener("resize", determineGraphSize);
  }, []);


  return (
    <div className="absolute top-0  left-0  w-full xl:relative  xl:p-5 xl:w-1/2  xl:h-1/2 xl:flex-none xl:h-76">
      <div className="flex justify-center  h-fit">
        <RadarChart
          captions={{
            hp: `HP(${hp})`,
            attack: `Attack(${attack})`,
            specialAttack: `S.Attack(${specialAttack})`,
            defend: `Defend(${defend})`,
            specialDefense: `S.Defense(${specialDefense})`,
            speed: `Speed(${speed})`,
          }}
          data={[
            {
              data: {
                hp: _hp,
                attack: _attack,
                specialAttack: _specialAttack,
                defend: _defend,
                specialDefense: _specialDefense,
                speed: _speed,
              },
              meta: { color: "blue" },
            }
          ]}
          size={ 300 }
        />
      </div>
    </div>
  );
};

export default State;
  