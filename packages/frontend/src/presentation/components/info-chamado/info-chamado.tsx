import React, { useEffect } from 'react'
import Styles from './info-chamado-styles.scss'
import { type ChamadoType } from '../lista-chamados/lista-chamados'
import { VisualizarChamado } from '@/main/enums/visualizar-chamado'
import { useNavigate } from 'react-router-dom'

const InfoChamado: React.FC<{ chamado: ChamadoType | undefined; visualizacaoChamado: VisualizarChamado }> = (props) => {
  const navigate = useNavigate()

  useEffect(() => {}, [props])

  const conteudo: any = () => {
    if (props.chamado !== undefined) {
      return (
        <>
          <div className={Styles.tituloDetalhe}>
            <label htmlFor='titulo'>Título</label>
            <input
              readOnly={true}
              value={props.chamado.title}
              type='text'
              className={Styles.inputTitulo}
              id='titulo'
              required
              autoFocus
              maxLength={60}
            />
            <label htmlFor='detalhes'>Detalhes</label>
            <textarea
              readOnly={true}
              value={props.chamado.description}
              className={Styles.inputDetalhe}
              id='detalhes'
              cols={30}
              rows={10}
              required
            ></textarea>
          </div>

          {props.chamado.requestStep === 'Analise de risco' ? (
            <button
              className={Styles.botaoAvaliar}
              onClick={() => {
                navigate('/riskAnalysis', { replace: true, state: props.chamado })
              }}
            >
              Avaliar
            </button>
          ) : props.chamado.requestStep === 'Alinhamento estratégico' ? (
            <button
              className={Styles.botaoAvaliar}
              onClick={() => {
                navigate('/strategicAlignment', { replace: true, state: props.chamado })
              }}
            >
              Avaliar
            </button>
          ) : (
            <p>Esse chamado já foi avaliado!</p>
          )}
        </>
      )
    }
    return (
      <div className={Styles.tituloChamado}>
        <p style={{ textAlign: 'center' }}>Selecione um chamado ao lado para visualizar seus detalhes.</p>
      </div>
    )
  }

  return <div className={Styles.infoChamadoWrapper}>{conteudo()}</div>
}

export default InfoChamado
