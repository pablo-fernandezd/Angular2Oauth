export class PartidoDTO {
  id: number;
  fechaPartido: Date;
  competicion: string;
  estado : number;
  equipoLocal: string;
  equipoVisitante: string;
  equipoLocalId: number;
  equipoVisitanteId: number;
  ganadorPerdedorRelacionado: number;
  equipoLocalRelacionadoPartido: number;
  equipoVisitanteRelacionadoPartido: number;
  pabellon: string;
  ganador: number;
  nOrden: number;
  nPosCruces: number;
  crearStream: boolean;
  federacionNombre: string;
}
