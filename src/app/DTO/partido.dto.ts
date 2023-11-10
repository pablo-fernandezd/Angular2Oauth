export class PartidoDTO {
  id: number;
  fechaPartido: Date;
  competicion: string;
  estaEmpezado: boolean;
  estaFinalizado: boolean;
  equipoLocal: string;
  equipoVisitante: string;
  pabellon: string;
  ganador: number;
  nOrden: number;
  nPosCruces: number;
  crearStream: boolean;
}
