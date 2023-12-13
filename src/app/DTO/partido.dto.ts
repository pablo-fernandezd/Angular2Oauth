export class PartidoDTO {
  id: number;
  fechaPartido: Date;
  competicion: string;
  estado : number;
  equipoLocal: string;
  equipoVisitante: string;
  equipoLocal_Id: number;
  equipoVisitante_Id: number;
  ganadorPerdedorRelacionado: number;
  equipoLocalRelacionadoPartido: number;
  equipoVisitanteRelacionadoPartido: number;
  pabellon: string;
  ganador: number;
  nOrden: number;
  nPosCruces: number;
  crearStream: boolean;
  federacionNombre: string;
  equipoVisitanteText: string;
  equipoLocalText: string;
}
