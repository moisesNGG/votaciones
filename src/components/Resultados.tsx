import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Candidato } from "../components/VotacionLogica";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  candidatos: Candidato[];
};

const Resultado: React.FC<Props> = ({ candidatos }) => {
  const total = candidatos.reduce((t, c) => t + c.votos, 0);

  const data = {
    labels: candidatos.map((c) => c.nombre),
    datasets: [
      {
        label: "Votos",
        data: candidatos.map((c) => c.votos),
        backgroundColor: ["#4e79a7", "#f28e2b", "#e15759"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Resultados" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <Bar data={data} options={options} />
      <div style={{ marginTop: "10px" }}>
        {candidatos.map((c) => (
          <div
            key={c.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{c.nombre}</span>
            <span>
              {c.votos} votos{" "}
              {total > 0 ? `(${((c.votos / total) * 100).toFixed(1)}%)` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resultado;
