import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'

export function SeacrhForm() {
  return (
    <SearchFormContainer>
      <input type="search" placeholder="Busque por transaçõeo" />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
