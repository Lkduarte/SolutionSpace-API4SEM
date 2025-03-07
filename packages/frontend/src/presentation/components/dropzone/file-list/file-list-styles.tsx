import styled from 'styled-components'

export const Container = styled.ul`
  margin-top: 20px;
  background-color: #535252;
  border-radius: 4px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }
  }
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    color: #fff;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      color: #ddd;
      text-align: start;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`

export const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url('${(props: any) => props}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`
